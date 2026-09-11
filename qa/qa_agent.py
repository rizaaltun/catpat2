#!/usr/bin/env python3
import hashlib
import json
import sys
from pathlib import Path

try:
    from PIL import Image
except Exception as exc:
    print(json.dumps({"status":"ERROR","reason":"Pillow unavailable","detail":str(exc)}))
    sys.exit(2)

ROOT = Path(__file__).resolve().parents[1]
POLICY = json.loads((ROOT / "qa" / "qa-agent-policy.json").read_text(encoding="utf-8"))


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def inspect_png(path: Path):
    issues = []
    try:
        img = Image.open(path)
        img.load()
    except Exception as exc:
        return {"file": str(path.relative_to(ROOT)), "issues": [f"P0 unreadable image: {exc}"]}

    if img.format != "PNG":
        issues.append("P1 canonical image must be PNG")
    if img.mode != "RGBA":
        issues.append(f"P1 canonical PNG must be RGBA, got {img.mode}")

    alpha = img.getchannel("A") if "A" in img.getbands() else None
    if alpha is None:
        issues.append("P1 no alpha channel")
        bounds = None
    else:
        bounds = alpha.getbbox()
        if bounds is None:
            issues.append("P1 fully transparent image")
        px = alpha.load()
        corners = [(0, 0), (img.width - 1, 0), (0, img.height - 1), (img.width - 1, img.height - 1)]
        if any(px[x, y] != 0 for x, y in corners):
            issues.append("P1 non-transparent corner; possible baked background")

    rel = str(path.relative_to(ROOT)).replace("\\", "/")
    if "/catpat/" in rel and any(part in rel for part in ["idle", "run", "jump", "fall", "land", "celebrate", "talk"]):
        expected = tuple(POLICY["canonical"]["catpatCanvas"])
        if img.size != expected:
            issues.append(f"P1 Catpat frame size {img.size} != {expected}")

    visible_bottom = bounds[3] if bounds else None
    if "/catpat/" in rel and any(part in rel for part in ["idle", "run", "land"]):
        expected_bottom = POLICY["canonical"]["catpatPivot"][1]
        if visible_bottom is not None and abs(visible_bottom - expected_bottom) > 1:
            issues.append(f"P1 grounded Catpat visible bottom {visible_bottom} != {expected_bottom}")

    return {
        "file": rel,
        "size": list(img.size),
        "mode": img.mode,
        "alphaBounds": list(bounds) if bounds else None,
        "sha256": sha256(path),
        "issues": issues,
    }


def audit_animation_folder(folder: Path, target_count=None):
    files = sorted(folder.glob("*.png"))
    results = [inspect_png(p) for p in files]
    issues = []
    hashes = [r.get("sha256") for r in results if r.get("sha256")]
    if len(hashes) != len(set(hashes)):
        issues.append("P1 duplicate file hashes detected; frame count cannot be faked")
    if target_count is not None and len(files) < target_count:
        issues.append(f"P1 frame count {len(files)} below target {target_count}")
    return {"folder": str(folder.relative_to(ROOT)), "files": results, "issues": issues}


def main():
    target = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "assets"
    if not target.is_absolute():
        target = ROOT / target
    if not target.exists():
        print(json.dumps({"status":"REJECT","issues":[f"P0 target not found: {target}"]}, ensure_ascii=False, indent=2))
        return 1

    audits = []
    if target.is_file():
        audits.append({"files": [inspect_png(target)], "issues": []})
    else:
        pngs = list(target.rglob("*.png"))
        if not pngs:
            audits.append({"files": [], "issues": ["P1 no PNG assets found"]})
        else:
            for folder in sorted({p.parent for p in pngs}):
                clip = folder.name.lower()
                target_count = POLICY.get("animationTargets", {}).get(clip)
                audits.append(audit_animation_folder(folder, target_count))

    all_issues = []
    for audit in audits:
        all_issues.extend(audit.get("issues", []))
        for f in audit.get("files", []):
            all_issues.extend(f.get("issues", []))

    status = "PASS" if not any(i.startswith(("P0", "P1")) for i in all_issues) else "REJECT"
    report = {"agent": POLICY["agent"], "status": status, "target": str(target), "issues": all_issues, "audits": audits}
    out = ROOT / "qa" / "last-report.json"
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if status == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
