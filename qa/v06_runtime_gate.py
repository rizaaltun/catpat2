#!/usr/bin/env python3
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "app.js"
REPORT = ROOT / "qa" / "v06-runtime-last-report.json"
EXPECTED_SOURCE_PNG_COUNT = 94
EXPECTED_CATPAT_FRAMES_PER_STATE = 8
CATPAT_STATES = ("idle", "run", "jump", "celebrate")


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def duplicate_groups(folder: Path):
    groups = {}
    if not folder.exists():
        return []
    for path in sorted(folder.glob("*.png")):
        groups.setdefault(sha256(path), []).append(path.name)
    return [names for names in groups.values() if len(names) > 1]


def runtime_asset_references(text: str):
    refs = set(re.findall(r"assets/[A-Za-z0-9_./-]+\.png", text))
    for state in CATPAT_STATES:
        for i in range(EXPECTED_CATPAT_FRAMES_PER_STATE):
            refs.add(f"assets/characters/catpat/{state}/catpat_{state}_{i:02d}.png")
    return sorted(refs)


def add_block(report, severity, code, **detail):
    item = {"severity": severity, "code": code}
    item.update(detail)
    report["blocking"].append(item)


def main():
    report = {
        "gate": "catpat2-v06-runtime-fidelity",
        "baseline": "Catpat2 v0.6",
        "status": "REPLACEMENT_REQUIRED",
        "blocking": [],
        "warnings": [],
        "measurements": {},
    }

    if not APP.exists():
        add_block(report, "P0", "MISSING_RUNTIME_SOURCE", path="app.js")
        REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
        print(json.dumps(report, ensure_ascii=False, indent=2))
        return 1

    text = APP.read_text(encoding="utf-8")

    assets_root = ROOT / "assets"
    png_files = sorted(assets_root.rglob("*.png")) if assets_root.exists() else []
    report["measurements"]["sourceTree"] = {
        "expectedPngCount": EXPECTED_SOURCE_PNG_COUNT,
        "actualPngCount": len(png_files),
    }
    if len(png_files) < EXPECTED_SOURCE_PNG_COUNT:
        add_block(
            report,
            "P0",
            "SOURCE_TREE_INCOMPLETE",
            expectedPngCount=EXPECTED_SOURCE_PNG_COUNT,
            actualPngCount=len(png_files),
            missingAtLeast=EXPECTED_SOURCE_PNG_COUNT - len(png_files),
        )

    refs = runtime_asset_references(text)
    missing_refs = [ref for ref in refs if not (ROOT / ref).is_file()]
    report["measurements"]["runtimeAssetReferences"] = {
        "referenceCount": len(refs),
        "missingCount": len(missing_refs),
        "missing": missing_refs,
    }
    if missing_refs:
        add_block(
            report,
            "P0",
            "MISSING_RUNTIME_ASSETS",
            count=len(missing_refs),
            paths=missing_refs,
        )

    for token in ("baykus", "civciv"):
        count = text.lower().count(token)
        if count:
            add_block(report, "P1", "BOOK_EXTERNAL_CAST", token=token, count=count)

    coded_ui = {
        "roundedPanelCalls": max(0, text.count("rr(") - text.count("function rr(")),
        "fillRectCalls": text.count("fillRect("),
        "textFitCalls": max(0, text.count("textFit(") - text.count("function textFit(")),
    }
    report["measurements"]["codedFinalUi"] = coded_ui
    if any(coded_ui.values()):
        add_block(report, "P1", "CODED_FINAL_UI", detail=coded_ui)

    if "{id:'thorn',x:2500" in text:
        v0, gravity, run_speed = 625.0, 1650.0, 270.0
        apex = v0 * v0 / (2 * gravity)
        airtime = 2 * v0 / gravity
        reach = run_speed * airtime
        report["measurements"]["movementEnvelope"] = {
            "jumpVelocity": v0,
            "gravity": gravity,
            "runSpeed": run_speed,
            "theoreticalApexPx": round(apex, 3),
            "theoreticalAirTimeSec": round(airtime, 3),
            "theoreticalHorizontalReachPx": round(reach, 3),
        }
        report["warnings"].append(
            "Current v0.6 thorn at x=2500 exists and requires practical landscape-mobile traversal QA before retention."
        )

    catpat = ROOT / "assets" / "characters" / "catpat"
    for state in CATPAT_STATES:
        folder = catpat / state
        files = sorted(folder.glob("*.png")) if folder.exists() else []
        duplicates = duplicate_groups(folder)
        report["measurements"][state] = {
            "fileCount": len(files),
            "expectedFileCount": EXPECTED_CATPAT_FRAMES_PER_STATE,
            "duplicateGroups": duplicates,
        }
        if len(files) != EXPECTED_CATPAT_FRAMES_PER_STATE:
            add_block(
                report,
                "P0",
                "INCOMPLETE_ANIMATION_FRAMESET",
                state=state,
                expected=EXPECTED_CATPAT_FRAMES_PER_STATE,
                actual=len(files),
            )
        if duplicates:
            add_block(
                report,
                "P1",
                "DUPLICATE_ANIMATION_FRAMES",
                state=state,
                groups=duplicates,
            )

    if not report["blocking"]:
        report["status"] = "PASS"

    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report["status"] == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
