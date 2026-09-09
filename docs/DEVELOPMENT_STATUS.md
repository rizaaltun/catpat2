# Catpat2 development status

## v0.6 - PRODUCTION LOCK / FIRST-APPROVED CATPAT ONLY

Active developer: **ChatGPT**. Do not hand off to Claude unless the user explicitly asks. Work remains on `chatgpt/development`; do not merge to `main`, deploy, or touch Cloudflare/domain settings.

## Non-negotiable production rules

1. **Character source lock:** use the first approved Catpat character assets only. Later rejected generated Catpat sprite sheets must not be integrated.
2. **Sprite files:** every animation frame is a separate transparent PNG. No baked sprite-board backgrounds and no composite sheet as the canonical source.
3. **Common geometry:** Catpat canvas `512x640`, foot pivot `(256,620)`. All frames must keep the same ground baseline. Left movement uses an exact horizontal mirror of the accepted right-facing frame around the pivot, never a separately redrawn character identity.
4. **Animation quality:** looping movement states require at least 8 unique frames. Jump, landing and celebrate frames are not promoted until they pass identity and pivot QA against the accepted Catpat.
5. **Character visibility:** gameplay art must provide clear value/color separation behind green Catpat. Do not place the main path against dense same-value green foliage. Prefer warm earth, light stone, pale sky/water and controlled greenery around the playable lane.
6. **Physical contact:** each platform/terrain asset has an authored `surface_y` / collider polygon based on its visible walkable top, not image alpha. Character foot pivot must meet that surface within a `2 px` visual tolerance at rest.
7. **Obstacle feasibility:** every required obstacle is validated against Catpat's actual jump arc before inclusion. No mandatory thorn/wall may exceed reachable height or width. Optional hard routes may be harder but may not soft-lock progression.
8. **No stretched terrain:** platform art keeps its native visual ratio. Longer surfaces use designed long modules or repeated seam-safe pieces, never CSS/image stretching.
9. **UI text:** if a menu/map design already contains its title/labels in the illustration, do not duplicate them with HTML text. Important decorative titles, level plaques and map labels should be baked into approved image assets when that prevents overflow. Runtime text is reserved for dynamic values such as score/count/time and must have measured safe bounds.
10. **Menu direction:** the next main menu is a festival-group composition showing the characters used in the game together, not Catpat alone. Character identities must match the book; substitute hedgehog/raccoon/dog/acorn characters are rejected.
11. **Delivery truth:** an asset is delivered only when the real PNG exists in GitHub on `chatgpt/development` and its manifest/QA data exists beside it.

## Canonical Catpat v01 package

Local production source currently validated from the first-approved art:

- `idle/catpat_idle_00.png` - 1 transparent frame
- `run/catpat_run_00.png` ... `catpat_run_07.png` - 8 transparent right-facing frames
- left direction is runtime mirror of these exact frames
- canvas `512x640`
- pivot `(256,620)`
- all current idle/run alpha bounds end at `y=620`
- all corner alpha values are `0`

A GitHub blob upload has begun for this canonical package. Do not point runtime code at later v0.5 generated jump/celebrate sheets.

## v0.5 findings retained as engineering lessons

- visual collider and platform top must be authored together
- hazards must damage/stop as drawn
- box/platform top landing must work
- route needs real gaps, height changes and timing/obstacle decisions
- map text overflow and duplicate labels are unacceptable

The v0.5 playtest is **not** the final visual baseline.

## Next production order

1. Complete GitHub upload of the first-approved Catpat idle/run PNG frames + manifest.
2. Produce/approve Catpat jump, land and celebrate as separate PNG frames from the same identity, then upload only after QA.
3. Redesign Chapter 1 environment with lower green density in the playable lane and authored collision surfaces.
4. Build a feasibility-tested obstacle route around the actual jump metrics.
5. Rebuild the festival-group main menu with book characters and image-baked static text/labels.
6. Rebuild chapter map labels as part of the illustrated UI where possible; keep only progress values dynamic.
7. Integrate and browser-test desktop + landscape mobile before presenting the next playtest.

No further concept-board screenshots are to be sent to the user unless an explicit visual review is requested. Work output goes to the repository and manifests first.
