# Catpat2 — 30-Day Professional Production Roadmap V0.7

This roadmap continues from the exact **Catpat2 v0.6** runtime baseline. The only production repository is `rizaaltun/catpat2`, branch `chatgpt/development`. `rizaaltun/catpat-game` is not a production source for this roadmap.

Each day is a full production block. Every meaningful batch ends with transactional QA; QA is not time-based.

## Working model for every production block
1. **Art production** — image-first final assets, not placeholders.
2. **Technical integration** — authored assets wired into the Catpat2 v0.6 runtime without redrawing finished UI in code.
3. **QA gate** — book fidelity, asset integrity, desktop 1280×720, landscape mobile, physics/contact/animation checks.
4. **Repository delivery** — accepted assets, manifests, source changes and report committed to `chatgpt/development`.

## Phase A — Recovery and visual foundation

### Day 1 — v0.6 recovery and standards lock
- audit the exact Catpat2 v0.6 source package
- lock the first-approved Catpat identity
- lock the image-authored finished-UI rule
- lock animation/pivot rules
- register all legacy/fake duplicate frames as replacement work
- establish hazard feasibility gate using actual v0.6 physics
- register book-external or incorrectly named characters as replacement-required
- establish canonical asset directory plan

### Day 2 — Canonical Catpat reference master
- compare first-approved Catpat against book references
- lock silhouette, proportions, face, palette and characteristic tooth/crest/boots
- validate 512×640 canvas and `(256,620)` foot pivot
- export/retain transparent canonical reference PNGs
- commit reference manifest and QA evidence

### Day 3 — Catpat idle + run production
- replace legacy duplicate idle sequence with 8 genuinely authored unique frames
- keep/QA the accepted 8 unique run frames; extend only if cadence requires it
- normalize canvas, pivot, baseline and visible scale
- derive left direction only as exact runtime horizontal mirror
- reject identity drift

### Day 4 — Catpat jump / apex / fall / land
- authored takeoff/rise/apex/fall/landing poses
- no run frames reused as air states
- no transform-only fake final poses
- integrate state timing based on actual physics
- verify no running-in-air behavior

### Day 5 — Catpat celebrate / talk / react
- replace duplicate/legacy celebrate family
- listening/talking/reacting sequences
- surprised, worried, thoughtful, happy reactions
- mobile readability QA

### Day 6 — Platform kit V0.7
- redesign short/medium/long/bridge/stump/step modules as image assets
- reduce green dominance around the playable lane
- authored walk-surface/collider metadata
- seam-safe modules; no stretching
- foot-contact QA

### Day 7 — Hazard / collectible kit and measured movement envelope
- validate actual v0.6 jump envelope and touch-control safety margin
- review/remove/resize the current thorn at runtime x=2500 if it fails practical traversal QA
- safe landing widths and moving-hazard language
- collectible/daisy/ticket/mission-object art family
- hazard acceptance manifest

## Phase B — Image-authored user interface

### Day 8 — Festival main-menu hero composition
- full festival environment plate
- book-verified cast only
- integrated lighting/perspective
- no sticker-like substitutes
- no coded panel/card composition

### Day 9 — Menu typography and buttons
- title asset
- primary normal/pressed/disabled button assets
- secondary buttons and illustrated icons
- Turkish spelling/overflow QA
- code supplies hitboxes only

### Day 10 — Chapter map redesign
- map background, route art, plaques, lock/active/completed markers
- static Turkish labels embedded in authored art
- remove duplicate coded labels

### Day 11 — Pause/settings/utility UI
- pause/settings cards as image assets
- authored toggle/slider/button pieces
- dynamic values only in code

### Day 12 — Results/rewards/friend-joined UI
- completion and festival-join art
- reward effects and transitions

## Phase C — Comic dialogue and book-verified companions

### Day 13 — Comic dialogue visual system
- consistent panel geometry
- left/right staging
- speech/thought balloon families
- next/continue visual affordance
- never present full scanned book pages

### Day 14 — Catpat comic portrait set
- neutral, happy, surprised, worried, thoughtful, determined, grateful, celebrating

### Day 15 — Maymun full production
- book identity lock
- gameplay animation, dialogue portraits and mission poses
- branch-game event integration with Porsuk

### Day 16 — Porsuk full production
- preserve current book-faithful identity where valid
- replace insufficient/fake animation with complete authored sequences
- branch-game integration

### Day 17 — Pıtpıt full production
- book-faithful rabbit identity
- individual transparent PNG animation/portrait set
- daisy-garden event integration

### Day 18 — Market cashier + secondary book cast
- purple hippo cashier art/portraits needed for market event
- only add secondary figures verified from the book
- Baykuş/Civciv legacy runtime slots removed or replaced; never relabel an unrelated asset

### Day 19 — Comic scene environments
- branch game encounter/problem/resolution
- market queue encounter/problem/resolution
- Pıtpıt daisy garden encounter/problem/resolution
- festival transition backgrounds

### Day 20 — Chapter 1 comic sequence
- encounter → problem → Catpat response → mission → resolution → thanks/learning → festival progression
- maintain book event logic and character relationships

## Phase D — Chapter 1 production-quality gameplay

### Day 21 — Chapter 1 environment final
- warm/blue/ochre playable-lane contrast
- lower green density behind green Catpat
- depth/parallax and festival landmarks

### Day 22 — Traversal/platform composition
- safe onboarding
- measured jump gaps/heights
- moving elements
- optional route and collectible routing
- no fake decorative collision surfaces

### Day 23 — Mission interaction art
- before/after object states
- illustrated interaction cues
- book-character reactions

### Day 24 — FX and feel pass
- landing dust, jump puff, pickup sparkle, restrained impact and celebration FX

### Day 25 — Chapter 1 full QA and correction
- complete playthrough
- collision/contact alignment
- mandatory-hazard feasibility
- touch tolerance
- animation state validation
- UI clipping/text validation
- story/gameplay continuity

## Phase E — Chapter 2 and progression

### Day 26 — Chapter 2 story/art lock
- book-compatible mission theme/cast/environment/comic storyboard

### Day 27 — Chapter 2 environment + gameplay kit
- background plates, platform variants, chapter objects/obstacles

### Day 28 — Chapter 2 comic + character animation completion
- portraits, reaction sprites, encounter/resolution panels

### Day 29 — Festival progression hub
- visible 0/1/2/… helped-friend states
- growing crowd and reward feedback

### Day 30 — Production milestone build
- full visual consistency audit
- chapter 1 polished
- chapter 2 first production slice
- mobile test build and presentation captures
- repository cleanup and next-month backlog

## Daily rejection criteria
A touched area is incomplete if any of these remain:
- coded rectangle/card pretending to be finished UI
- character identity drift or character not supported by the book
- duplicate frames used to fake animation count
- run pose reused as final jump/fall/celebrate art
- floating feet or invisible-surface mismatch
- unmeasured mandatory hazard
- green-on-green player readability failure
- stretched terrain art
- text overflow or duplicate labels
- scanned/full book-page presentation instead of comic dialogue

## Repository cadence
Each production block ends with accepted runtime assets, manifest updates, QA evidence, source integration and a production report. No work is called delivered unless its real files exist in `rizaaltun/catpat2` on `chatgpt/development`.