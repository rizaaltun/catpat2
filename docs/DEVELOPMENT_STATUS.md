# Catpat2 development status

## v0.4 - IMAGE-FIRST PLAYTEST CANDIDATE

Active developer: **ChatGPT**. Do not hand off to Claude unless the user explicitly asks. Work remains on `chatgpt/development`; do not merge to `main`, deploy, or touch Cloudflare/domain settings.

### What changed from rejected v0.3

v0.3 remains rejected and is not the visual baseline. v0.4 changes the production order to **Image assets first, code integration second**.

The current v0.4 candidate was rebuilt around new image-produced game assets instead of CSS/HTML boxes:

- Full 16:9 illustrated forest/festival **main-menu background plate**.
- Separate transparent painted **ÇATPAT / NEZAKET ORMANI title logo**.
- Separate transparent **Oyuna Başla normal and pressed-state button images**.
- Illustrated **chapter-map background** with baked route, river, mountains, festival and blank stage-marker spaces; stage labels are lightweight overlays rather than box UI.
- Illustrated 16:9 **Chapter 1 gameplay background plate**.
- Image-produced transparent **terrain/platform module sheet**, split into real short/medium/long/bridge/step/stump/ramp assets without horizontal stretching.
- Book-faithful green Catpat remains the gameplay/menu character source; generated brown/acorn/dog/raccoon substitutes are not used.
- The corrected eight-frame Catpat run animation is retained at the same visual scale/pivot as idle.
- Book-derived Pitpit and daisy art are retained for character/story fidelity.
- Story uses full illustrated book scenes rather than generic coded cards.

### Current playable candidate

Local self-contained file: `Catpat2-v0.4-image-first-test.html`.

Flow implemented:

`illustrated main menu -> illustrated chapter map -> book-art story pages -> playable Chapter 1 scene -> 12 daisies -> Pitpit goal/recruitment`.

The first route is approximately 6900 virtual pixels wide and uses 12 naturally proportioned terrain modules / 12 collectibles rather than stretched filler platforms.

### Visual QA performed

Static render checks were made from the exact assets and layout used by the candidate:

- menu composition now visually matches the approved lush storybook/mobile-game direction much more closely: full illustrated festival valley, image-produced logo and real image button, book-faithful Catpat.
- gameplay composition now uses the image-produced forest plate and matching terrain modules; no platform image is horizontally distorted.
- story presentation uses supplied book art on top of the same illustrated forest world.
- chapter map uses the image-produced parchment/forest route plate.

JavaScript syntax for the external-source build passes `node --check`. PNG asset integrity checks passed for 29 current image files. Chromium screenshot automation in the current container did not complete reliably, so **do not claim full browser QA yet**; the self-contained playtest requires user/device playtest before v0.4 is accepted.

### Delivery truth

The v0.4 self-contained playtest and a complete source ZIP exist as local conversation artifacts. The GitHub status file is updated, but the full ~21 MB binary asset set is **not yet fully uploaded to the repository**. Do not call GitHub binary delivery complete until the real assets are committed on `chatgpt/development`.

### Next art-first work after v0.4 playtest feedback

1. Replace remaining utility HUD/pause shapes with dedicated Image-produced UI assets.
2. Produce additional Chapter 1 background/foreground plates so the longer route changes scenery rather than reusing one plate.
3. Produce book-faithful story/dialogue character poses and comic panel frames as separate game assets.
4. Produce Pitpit idle/walk/happy animation clips with at least 8 unique frames per looping state.
5. Add friends/recruitment screen and festival progression in the same illustrated UI family.
6. Continue later chapters only after this visual language is accepted.

Do not return to the v0.3 coded-card visual direction.
