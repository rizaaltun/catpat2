#!/usr/bin/env python3
import json
import math
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / 'app.js'
PATCH = ROOT / 'patches' / 'v07-runtime-fixes.js'
OUT = ROOT / 'qa' / 'v06-route-last-report.json'


def number(pattern, text, label):
    m = re.search(pattern, text)
    if not m:
        raise RuntimeError(f'missing {label}')
    return float(m.group(1))


def main():
    if not APP.exists():
        report = {'gate':'catpat2-v06-route-envelope','status':'PENDING_SOURCE_IMPORT'}
        OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
        print(json.dumps(report, ensure_ascii=False, indent=2))
        return 0

    text = APP.read_text(encoding='utf-8')
    patch = PATCH.read_text(encoding='utf-8') if PATCH.exists() else ''

    jump_v = number(r'player\.vy=-([0-9.]+)', text, 'jump velocity')
    gravity = number(r'player\.vy\+=([0-9.]+)\*dt', text, 'gravity')
    run_speed = number(r'const target=inputX\*([0-9.]+)', text, 'run speed')
    half_width = number(r'PLAYER_HW=([0-9.]+)', text, 'player half width')

    apex = jump_v * jump_v / (2 * gravity)
    airtime = 2 * jump_v / gravity
    max_reach = run_speed * airtime
    landing_margin = half_width * 0.55

    platform_matches = re.findall(
        r"\{id:'(p(?:m|\d+))',x:(\d+),w:(\d+),s:(\d+),a:'[^']+'(?:,moving:true,base:(\d+),amp:(\d+),speed:([0-9.]+),phase:(\d+))?\}",
        text,
    )
    platforms = []
    for pid, x, w, surface, base, amp, speed, phase in platform_matches:
        item = {'id':pid, 'x':float(x), 'w':float(w), 'surfaceY':float(surface)}
        if base:
            item.update({'moving':True,'base':float(base),'amp':float(amp),'speed':float(speed),'phase':float(phase)})
        platforms.append(item)
    platforms.sort(key=lambda p:p['x'])

    transitions = []
    p1 = []
    for left, right in zip(platforms, platforms[1:]):
        raw_gap = right['x'] - (left['x'] + left['w'])
        effective_center_travel = max(0.0, raw_gap + 2 * landing_margin)
        rise = max(0.0, left['surfaceY'] - right['surfaceY'])
        horizontal_reserve = max_reach - effective_center_travel
        horizontal_reserve_pct = horizontal_reserve / max_reach * 100
        vertical_reserve = apex - rise

        status = 'GREEN'
        reasons = []
        # Require >=15% horizontal reserve for a mandatory touch route.
        if horizontal_reserve_pct < 5 or vertical_reserve < 8:
            status = 'RED'
            reasons.append('near-theoretical-limit')
        elif horizontal_reserve_pct < 15 or vertical_reserve < 20:
            status = 'AMBER'
            reasons.append('low-mobile-input-reserve')

        t = {
            'from': left['id'], 'to': right['id'],
            'rawGapPx': round(raw_gap,2),
            'effectiveCenterTravelPx': round(effective_center_travel,2),
            'risePx': round(rise,2),
            'horizontalReservePx': round(horizontal_reserve,2),
            'horizontalReservePct': round(horizontal_reserve_pct,2),
            'verticalReservePx': round(vertical_reserve,2),
            'status': status, 'reasons': reasons,
        }
        transitions.append(t)
        if status in ('RED','AMBER'):
            p1.append(t)

    thorn_in_baseline = "{id:'thorn',x:2500" in text
    thorn_quarantined = 'hazards.splice(legacyThornIndex,1)' in patch

    report = {
        'gate':'catpat2-v06-route-envelope',
        'status':'REPLACEMENT_REQUIRED' if p1 else 'PASS',
        'physics': {
            'jumpVelocity':jump_v,
            'gravity':gravity,
            'runSpeed':run_speed,
            'theoreticalApexPx':round(apex,3),
            'theoreticalAirTimeSec':round(airtime,3),
            'theoreticalHorizontalReachPx':round(max_reach,3),
            'landingCenterMarginPx':round(landing_margin,3),
            'mandatoryTouchHorizontalReserveTargetPct':15,
        },
        'transitions':transitions,
        'routeRisks':p1,
        'legacyThorn': {
            'presentInV06Baseline':thorn_in_baseline,
            'quarantinedFromWorkingMandatoryRoute':thorn_quarantined,
            'finalStatus':'REPLACEMENT_REQUIRED_UNTIL_PRACTICAL_MOBILE_QA'
        },
        'notes':[
            'This is a deterministic geometry screen, not a substitute for browser/device playthrough.',
            'AMBER/RED transitions must be redesigned or demonstrated with practical landscape-mobile input evidence before shipping.',
            'The legacy thorn remains a production task even while quarantined from the working route.'
        ]
    }
    OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if not p1 else 1


if __name__ == '__main__':
    raise SystemExit(main())
