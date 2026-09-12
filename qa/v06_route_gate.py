#!/usr/bin/env python3
import json
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


def evaluate(platforms, max_reach, apex, landing_margin):
    ordered = sorted(platforms, key=lambda p:p['x'])
    transitions = []
    risks = []
    for left, right in zip(ordered, ordered[1:]):
        raw_gap = right['x'] - (left['x'] + left['w'])
        effective_center_travel = max(0.0, raw_gap + 2 * landing_margin)
        rise = max(0.0, left['surfaceY'] - right['surfaceY'])
        horizontal_reserve = max_reach - effective_center_travel
        horizontal_reserve_pct = horizontal_reserve / max_reach * 100
        vertical_reserve = apex - rise
        status = 'GREEN'
        reasons = []
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
            risks.append(t)
    return transitions, risks


def parse_route_overrides(patch):
    m = re.search(r'routeXOverrides=Object\.freeze\(\{(.*?)\}\);', patch, re.S)
    if not m:
        return {}
    return {pid:float(x) for pid,x in re.findall(r'(p(?:m|\d+))\s*:\s*(\d+(?:\.\d+)?)', m.group(1))}


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
    baseline = []
    for pid, x, w, surface, base, amp, speed, phase in platform_matches:
        item = {'id':pid, 'x':float(x), 'w':float(w), 'surfaceY':float(surface)}
        if base:
            item.update({'moving':True,'base':float(base),'amp':float(amp),'speed':float(speed),'phase':float(phase)})
        baseline.append(item)

    baseline_transitions, baseline_risks = evaluate(baseline, max_reach, apex, landing_margin)
    overrides = parse_route_overrides(patch)
    working = [{**p, 'x':overrides.get(p['id'], p['x'])} for p in baseline]
    working_transitions, working_risks = evaluate(working, max_reach, apex, landing_margin)

    thorn_in_baseline = "{id:'thorn',x:2500" in text
    thorn_quarantined = 'hazards.splice(legacyThornIndex,1)' in patch
    route_status = 'PASS' if not working_risks else 'REPLACEMENT_REQUIRED'

    report = {
        'gate':'catpat2-v06-route-envelope',
        'status':route_status,
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
        'baseline': {
            'riskCount':len(baseline_risks),
            'routeRisks':baseline_risks,
        },
        'workingPatch': {
            'positionOverrides':overrides,
            'transitions':working_transitions,
            'riskCount':len(working_risks),
            'routeRisks':working_risks,
        },
        'legacyThorn': {
            'presentInV06Baseline':thorn_in_baseline,
            'quarantinedFromWorkingMandatoryRoute':thorn_quarantined,
            'workingRouteStatus':'SAFE_FROM_LEGACY_THORN' if thorn_quarantined else 'P1_UNVERIFIED',
            'finalArtStatus':'REPLACEMENT_REQUIRED_UNTIL_PRACTICAL_MOBILE_QA'
        },
        'notes':[
            'Geometry gate includes the player-center landing margin; it does not equate raw gap with safe gap.',
            'Working platform overrides change x positions only; platform image width/aspect is not stretched.',
            'This deterministic geometry pass is still not a substitute for landscape-mobile browser/device playthrough.',
            'The legacy thorn remains an art/design production task even while removed from the current mandatory route.'
        ]
    }
    OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if route_status == 'PASS' else 1


if __name__ == '__main__':
    raise SystemExit(main())
