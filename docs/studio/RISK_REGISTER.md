# Catpat2 Production Risk Register

## R01 — Character identity drift
P1. Generated frames may alter face, tooth, crest, proportions or costume. Mitigation: canonical master + book evidence + per-frame visual gate; rejected variants never enter runtime.

## R02 — Wrong/book-external companion retained
P1. Legacy v0.6 currently references `baykus` and `civciv`. Mitigation: replacement-required registry; remove/replace only with verified book characters/events; never relabel unrelated art.

## R03 — Sticker-like character placement
P1. Menu/story cast looks pasted onto a separate environment. Mitigation: shared lighting, contact shadow, perspective/scale and scene composition designed around character positions.

## R04 — Coded final UI returns
P1. v0.6 still draws final-looking rounded panels/HUD/pause/map elements in canvas. Mitigation: image-asset matrix; code only layout/input/dynamic values/hitboxes.

## R05 — Turkish baked-text errors
P1/P2. Mitigation: copy lock, spelling/diacritic pass, safe margins and revisionable text-bearing assets.

## R06 — Animation quantity without real poses
P1. Exact v0.6 has 8 idle files but only 4 unique hashes and 8 celebrate files but only 7 unique hashes. Hash uniqueness alone still does not prove authored motion. Mitigation: pose-phase review and provenance gate.

## R07 — Running in air / weak state transitions
P1. Mitigation: authored takeoff/rise/apex/fall/land states mapped to physics velocity/events.

## R08 — Floating feet / invisible collision
P1. Mitigation: authored surface metadata, `(256,620)` foot pivot, 2 px contact tolerance.

## R09 — Impossible or frustrating mandatory obstacle
P0. Exact v0.6 contains a thorn at x=2500. Theoretical envelope alone is insufficient; practical mobile/touch margin must pass. Mitigation: movement laboratory, recorded safe margins, redesign/remove when required.

## R10 — Green-on-green readability
P1/P2. Mitigation: warm earth/stone/water/ochre around player lane; green pushed into framing/depth.

## R11 — Background repetition / hidden gameplay
P2/P1. Mitigation: six visual zones and foreground exclusion around mandatory hazards/landings.

## R12 — Comic becomes book-page slideshow
P1. Mitigation: dedicated comic panels/portraits/balloon grammar, short dialogue beats; never full scanned page delivery.

## R13 — Comic mobile readability
P1. Mitigation: 844×390 gate, fixed portrait breathing zones, safe balloon regions.

## R14 — Asset bloat / memory pressure
P1/P2. v0.6 source is ~40 MB unpacked with many large PNGs. Mitigation: right-size assets, scene/state loading, avoid redundant rejected art, mobile footprint audits.

## R15 — Local-only delivery falsely reported
Process P1. The exact v0.6 source archive exists locally but the full runtime binary tree is not yet present in the current `catpat2/chatgpt/development` tree. Mitigation: delivery is complete only after actual Git paths + manifests + runtime/QA exist.

## R16 — Repo confusion
Project P0. `catpat-game` was mistakenly used as active production. Mitigation: only `rizaaltun/catpat2` / `chatgpt/development` is authorized; automation and QA policy now enforce this.

## R17 — Style experimentation derails schedule
P2/high project risk. Mitigation: stable Art Bible; experiments outside canonical paths; changes only for book fidelity, usability or correctness.

## R18 — Schedule becomes documentation-only
Project P0. Mitigation: each production gate requires binary/runtime evidence when scheduled; documentation alone cannot close consecutive production gates.