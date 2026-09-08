# Catpat2 development status

## v0.3 - book-faithful story + scale/platform/length revision

Active developer: **ChatGPT**. Do not hand off to Claude unless the user explicitly asks. Work remains on `chatgpt/development`; do not merge to `main`, deploy, or touch Cloudflare/domain settings.

### Implemented in the current tested playtest

- Fixed Catpat's run/idle apparent scale mismatch. The approved eight run PNGs are normalized to the idle character's **406 px visible height** while keeping the common foot baseline at alpha `y=620`; poses remain the existing approved artwork rather than being redrawn.
- Removed horizontally stretched platforms. The platform art is trimmed to real alpha bounds and rendered with its **natural source aspect ratio** (`height:auto`, `object-fit:contain`).
- Expanded the first mission world to **9300 px**, with 18 modular platform pieces, real gaps, four named route sections and 12 collectible daisies. It no longer ends after a few seconds.
- The first story sequence is now a four-panel comic-style flow. Its first two panels use exact crops from the supplied book's Pitpit daisy-garden scene; the dialogue uses the book-faithful green Catpat and Pitpit assets.
- The incorrect generated celebration face with the wrong teeth is not used. The completion card uses an exact book crop of happy Catpat where the characteristic **single protruding tooth** is present.
- Menu presentation was enriched with layered festival/lantern decoration while retaining the book-faithful Catpat sprite rather than the previously generated wrong face.
- Quest HUD now tracks `0 / 12` through `12 / 12`; zone labels, checkpoints, pause/resume and keyboard/touch controls remain active.

### QA - 2026-09-08

The self-contained local playtest `Catpat2-v0.3-revizyon-test.html` was parsed as JavaScript and exercised in Chromium using its actual HTML contents at:

- desktop `1280x720`
- landscape mobile `844x390`

Verified flow: menu -> level map -> story -> mission -> running -> jumping -> pause/resume. No page/console errors occurred in the QA run and neither viewport produced document overflow. The mission DOM contains 18 platform pieces and 12 daisies; the world width is 9300 px. Sample platform rendered aspect ratios matched their intrinsic image ratios and all tested pieces report `object-fit: contain`.

Static sprite QA verified all eight run frames against `catpat_idle_00.png`: idle visible alpha bbox `(79,214)-(433,620)`, height 406; every run frame has visible height 406 and bottom alpha boundary 620. Current self-contained HTML SHA256: `e7027051007f3859e5eb49f9a092f7a4a2347eeb572e937a9ce301aad530f390`.

### Delivery truth / remaining work

The v0.3 playtest is a tested local artifact provided to the user, but the full self-contained HTML and all binary assets are **not yet fully committed to GitHub**. Do not describe the GitHub game delivery as complete until the real playable source and binary image files are present on this branch.

This is still a development milestone, not the finished game. The user's visual target is the rich professional storybook/mobile-game concept language previously approved. The current route still needs additional scene-specific Image-produced backgrounds/foregrounds, richer level staging, full companion animation sets, sound/music, save/accessibility UI, later missions and the festival endgame. Future art must keep book character identity exact; poses may change, but character face/proportions/tooth and species details must not drift.
