#!/usr/bin/env python3
import hashlib
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "app.js"
REPORT = ROOT / "qa" / "v06-runtime-last-report.json"


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


def main():
    report = {
        "gate": "catpat2-v06-runtime-fidelity",
        "baseline": "Catpat2 v0.6",
        "status": "PENDING_SOURCE_IMPORT",
        "blocking": [],
        "warnings": [],
        "measurements": {},
    }

    if not APP.exists():
        report["warnings"].append("app.js is not yet promoted into the Catpat2 Git tree; exact local v0.6 remains the runtime baseline.")
        REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
        print(json.dumps(report, ensure_ascii=False, indent=2))
        return 0

    text = APP.read_text(encoding="utf-8")
    report["status"] = "REPLACEMENT_REQUIRED"

    for token in ("baykus", "civciv"):
        count = text.count(token)
        if count:
            report["blocking"].append({"severity": "P1", "code": "BOOK_EXTERNAL_CAST", "token": token, "count": count})

    coded_ui = {
        "roundedPanelCalls": max(0, text.count("rr(") - text.count("function rr(")),
        "fillRectCalls": text.count("fillRect("),
        "textFitCalls": max(0, text.count("textFit(") - text.count("function textFit(")),
    }
    report["measurements"]["codedFinalUi"] = coded_ui
    if any(coded_ui.values()):
        report["blocking"].append({"severity": "P1", "code": "CODED_FINAL_UI", "detail": coded_ui})

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
        report["warnings"].append("Current v0.6 thorn at x=2500 exists and requires practical landscape-mobile traversal QA before retention.")

    catpat = ROOT / "assets" / "characters" / "catpat"
    for state in ("idle", "run", "jump", "celebrate"):
        folder = catpat / state
        if not folder.exists():
            continue
        files = sorted(folder.glob("*.png"))
        duplicates = duplicate_groups(folder)
        report["measurements"][state] = {"fileCount": len(files), "duplicateGroups": duplicates}
        if duplicates:
            report["blocking"].append({"severity": "P1", "code": "DUPLICATE_ANIMATION_FRAMES", "state": state, "groups": duplicates})

    if not report["blocking"]:
        report["status"] = "PASS"

    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report["status"] == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
