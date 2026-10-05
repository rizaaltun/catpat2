# Catpat2 development status

## ACTIVE TARGET — exact Catpat2 v0.6 continuation

Production repository: **`rizaaltun/catpat2`**
Production branch: **`chatgpt/development`**
Baseline runtime: **Catpat2 v0.6** from `Catpat2-v0.6-source.zip`
Baseline archive SHA256: `60bfe61f97aa47ce1bfbb61aa13e32fdcdafa1db1d8372fe63ef9020e1867dab`

`rizaaltun/catpat-game` is not an active source, production target or test-build source for this project. It was used by mistake during an earlier work segment and must not be substituted again.

## Baseline delivery state
The exact Catpat2 v0.6 source package contains 101 files / 94 PNGs / 40,977,489 unpacked bytes. The exact locked mobile build was recovered again and yielded **61 embedded runtime PNGs / 54 unique SHA256 images** with the expected v0.6 duplicate pattern. Those recovered binaries are available as recovery evidence outside GitHub, but the production branch still contains **0 PNG binaries** at canonical asset paths. The hard runtime QA gate now reports this as P0 instead of allowing a misleading green build.

The full 94-PNG source tree is therefore **not yet fully delivered in GitHub**. Binary promotion remains required; recovered runtime binaries must not be confused with final accepted character art.

## Known v0.6 defects now locked by QA
- idle: 8 filenames but only **4 unique SHA256 images**
- run: 8/8 unique baseline frames
- jump: 8 unique files but legacy provenance/pose quality is not accepted as final authored airborne animation
- celebrate: 8 filenames but only **7 unique SHA256 images**
- base runtime/menu references to `baykus` and `civciv` have now been removed; their legacy source files remain recovery-only and replacement-required
- runtime contains a thorn at x=2500; practical mobile traversal must be tested, not assumed
- final-looking HUD/pause/map panels and text are still drawn with canvas code and must migrate to image-authored UI

Exact findings: `qa/V06_BASELINE_AUDIT.json`.

## Non-negotiable production rules
1. First-approved Catpat identity only; no later rejected character reinterpretations.
2. Character animation source frames are separate transparent PNG files; no sprite sheet as canonical source.
3. Catpat canvas `512x640`, foot pivot `(256,620)`; left movement is exact runtime mirror of accepted right-facing art.
4. Duplicate files, translations/scales or reused run poses do not count as authored animation frames.
5. Named side characters and final story events require evidence from **Çatpat Nezaketi Öğreniyor**.
6. Book-external/incorrect characters are replaced, not silently retained or renamed.
7. Finished UI is image-authored. Code supplies hitboxes, state, layout mechanics and truly dynamic values.
8. Platform visual tops and colliders are authored together; grounded Catpat contact tolerance is 2 px.
9. Mandatory hazards require measured physics plus practical landscape-mobile touch QA.
10. Playable lane must keep green Catpat readable using warm earth/stone/water/ochre contrast.
11. No stretched terrain art.
12. Story delivery uses comic dialogue, not full/scanned book pages.
13. Delivery is real only when binaries, manifest/runtime references and QA evidence exist in this repository.

## Production system
- `docs/PRODUCTION_ROADMAP_30_DAYS_V07.md`
- `docs/studio/MASTER_PRODUCTION_SYSTEM.md`
- `docs/studio/CALENDAR_30_DAYS.md`
- `docs/studio/ASSET_ANIMATION_MATRIX.md`
- `docs/studio/QA_ACCEPTANCE_MATRIX.md`
- `docs/studio/RISK_REGISTER.md`
- `qa/qa-agent-policy.json`
- `qa/book-character-registry.json`

## Current gate
**Day 02 — Canonical Catpat master / exact v0.6 recovery.**

Completed in this gate:
- exact source archive hash locked
- exact v0.6 mobile-build hash revalidated and 61 embedded runtime PNGs recovered
- exact v0.6 animation duplicate audit completed
- correct thorn presence recorded
- base app book-external Baykuş/Civciv runtime/menu references removed
- base app missing story background reference fixed
- v0.7 patch reduced to route-safety overrides and thorn quarantine only
- asset manifest corrected to canonical 512x640 Catpat canvas / (256,620) foot pivot
- runtime QA changed to a hard P0 gate for missing/incomplete binary source promotion
- old-repo substitution explicitly prohibited
- book-character registry connected to QA
- 30-day program and studio control documents moved onto Catpat2
- autonomous continuation agent retargeted to Catpat2 v0.6

Next production work:
1. promote the 61 exact recovered runtime PNGs into canonical `assets/...` paths on `catpat2/chatgpt/development`;
2. identify/recover the remaining 33 PNGs needed to match the 94-PNG exact source package inventory;
3. rerun the hard QA gate and verify runtime references, duplicates and route evidence against the promoted binaries;
4. replace the duplicate idle family with 8 genuinely authored canonical Catpat frames;
5. visually recheck the accepted run family against the private book source and keep it isolated from unapproved jump/celebrate art;
6. author book-faithful jump/fall/land and celebrate/talk/react families;
7. produce book-faithful Pıtpıt, Porsuk and Maymun animation packages and wire them only after QA acceptance;
8. validate the quarantined v0.6 thorn and route against practical touch-control margins before retain/resize/replace decisions.

Do not merge to `main`, deploy, or change Cloudflare/domain settings without explicit user authorization. Do not show rejected visual experiments to the user.