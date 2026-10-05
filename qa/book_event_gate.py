#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "manifest.json"
REGISTRY = ROOT / "qa" / "book-character-registry.json"
REPORT = ROOT / "qa" / "book-event-last-report.json"

EXPECTED_EVENTS = {"branch-game", "pitpit-daisy-garden", "market-queue", "festival-progression"}
FORBIDDEN_LEGACY = {"baykus", "civciv"}


def fail(report, code, **detail):
    report["blocking"].append({"severity": "P1", "code": code, **detail})


def main():
    report = {
        "gate": "catpat2-book-event-canon",
        "status": "REJECT",
        "blocking": [],
        "measurements": {},
    }
    if not MANIFEST.is_file() or not REGISTRY.is_file():
        report["blocking"].append({"severity": "P0", "code": "MISSING_CANON_INPUT"})
        REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
        print(json.dumps(report, ensure_ascii=False, indent=2))
        return 1

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    registry = json.loads(REGISTRY.read_text(encoding="utf-8"))
    verified = set(registry.get("characters", {}))
    replacement = set(registry.get("replacementRequiredLegacy", {}))

    events = manifest.get("storyEvents", [])
    event_ids = {e.get("id") for e in events}
    report["measurements"]["eventIds"] = sorted(x for x in event_ids if x)
    missing = sorted(EXPECTED_EVENTS - event_ids)
    if missing:
        fail(report, "MISSING_BOOK_EVENT", ids=missing)

    unknown_cast = {}
    for event in events:
        event_id = event.get("id", "<missing-id>")
        cast = set(event.get("cast", []))
        unknown = sorted(cast - verified)
        if unknown:
            unknown_cast[event_id] = unknown
        if cast & FORBIDDEN_LEGACY:
            fail(report, "LEGACY_CAST_IN_CANON_EVENT", event=event_id, cast=sorted(cast & FORBIDDEN_LEGACY))
        if not str(event.get("bookEvidence", "")).strip():
            fail(report, "MISSING_BOOK_EVIDENCE", event=event_id)
        if "planned" not in str(event.get("productionStatus", "")) and event_id != "festival-progression":
            fail(report, "EVENT_STATUS_NOT_PLANNED", event=event_id, status=event.get("productionStatus"))

    if unknown_cast:
        fail(report, "UNVERIFIED_EVENT_CAST", events=unknown_cast)

    canon = manifest.get("bookCanon", {})
    declared_legacy = set(canon.get("replacementRequiredLegacy", []))
    if declared_legacy != FORBIDDEN_LEGACY:
        fail(report, "LEGACY_REPLACEMENT_SET_DRIFT", expected=sorted(FORBIDDEN_LEGACY), actual=sorted(declared_legacy))
    if not FORBIDDEN_LEGACY.issubset(replacement):
        fail(report, "REGISTRY_LEGACY_SET_INCOMPLETE", expected=sorted(FORBIDDEN_LEGACY), actual=sorted(replacement))

    legacy = manifest.get("recoveryRuntime", {})
    if legacy.get("legacyMissionStatus") != "recovery-only-not-canonical-final":
        fail(report, "LEGACY_MISSION_PROMOTED_AS_FINAL", status=legacy.get("legacyMissionStatus"))

    if not report["blocking"]:
        report["status"] = "PASS"
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report["status"] == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
