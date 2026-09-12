# Catpat2 — Master Production System

Production baseline: **Catpat2 v0.6**
Production repository: `rizaaltun/catpat2`
Production branch: `chatgpt/development`
Owner: ChatGPT

## Product promise
The game must feel like an interactive extension of **Çatpat Nezaketi Öğreniyor**, not a browser prototype decorated with assets.

The player must perceive book-faithful characters, image-authored interface, rich authored animation, believable physical contact, readable/fair platforming, comic-dialogue storytelling, visible festival progression and landscape-mobile-first composition.

## Source hierarchy
1. Complete source book PDF and page evidence for canon/story.
2. First-approved Catpat gameplay asset family for Catpat identity.
3. Exact `Catpat2-v0.6-source.zip` runtime baseline, SHA256 recorded in `qa/V06_BASELINE_AUDIT.json`.
4. New QA-passed assets/code promoted on `chatgpt/development`.

No `catpat-game` runtime, character or build may silently replace the Catpat2 v0.6 source.

## Non-negotiable rules
1. No finished menu/panel/button/plaque/card/decorative container may be a CSS/canvas rectangle.
2. Fixed UI wording is authored as part of image assets where practical.
3. Dynamic text appears only inside authored frames with measured safe bounds.
4. Catpat and companions preserve book identity frame-to-frame.
5. Airborne animation is separately authored; run frames cannot represent jump/fall.
6. Duplicate files/transforms cannot fake authored animation count.
7. Traversable surfaces and collider metadata are authored together.
8. Mandatory hazards require measured movement-envelope and touch-tolerance validation.
9. Green Catpat remains readable at phone scale; playable lane cannot be same-value green.
10. Story delivery is comic dialogue, never a full/scanned book page.
11. Book-external/incorrect runtime characters become replacement-required and cannot remain final.
12. An asset is delivered only when the actual binary is in `catpat2`, referenced by manifest/runtime and QA-checked.

## Studio disciplines
Art Direction; Character Art; Animation; Environment Art; UI/UX Art; Comic Direction; Game Design; Technical Art; Engineering; QA.

## Production cycle for every meaningful batch
A. Reference/design lock.
B. Final-use image production.
C. Technical preparation: alpha/canvas/pivot/surface/naming/manifest.
D. Runtime integration without redrawing the art in code.
E. Transactional QA: technical + book fidelity + desktop/mobile + physics/input.
F. Repo closeout on `chatgpt/development`.

QA runs because a production/integration batch ended, not because an hour passed.

## Definition of Ready
Purpose/screen/state, book/source evidence, dimensions, variants, canonical path, runtime/collision needs and acceptance criteria are known before final production art begins.

## Definition of Done
Final binary exists in canonical Git path; dimensions/alpha/identity/pivot/surface pass; runtime points to it; 1280×720 and 844×390 checks pass; manifest is current; rejected experiments are not referenced; report records delivery truthfully.

## Severity
P0: cannot start, progression soft-lock, impossible mandatory traversal, missing critical runtime asset.
P1: identity drift/book-external character/invented final story beat/fake duplicate animation/running in air/floating feet/major clipping/coded final UI/unreadable comic.
P2: polish defects.
P3: optional enhancement.

Milestone requires P0=0 and P1=0 in the shipped scope.