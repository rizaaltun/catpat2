# Catpat2 development status

## v0.3 - REJECTED BY USER / do not continue from this visual implementation

Active developer: **ChatGPT**. Do not hand off to Claude unless the user explicitly asks. Work remains on `chatgpt/development`; do not merge to `main`, deploy, or touch Cloudflare/domain settings.

### Why v0.3 is rejected

The technical fixes in v0.3 (run/idle scale normalization, non-stretched platforms, longer route) were useful, but the user rejected the overall result because the visual implementation still looked like a coded prototype instead of the previously approved professional mobile-game mockups. The main failure was process order: weak/reused scene pieces were arranged in code before creating the final scene artwork with the Image tool.

**Do not treat v0.3 as the visual baseline.** Do not keep polishing its menu, story panels, or level dressing. Preserve only the useful mechanical lessons: consistent character scale/pivot, natural platform aspect ratios, longer level duration, real gaps, and robust controls.

## New production rule - image-first, integration-second

For each screen or gameplay segment, use this order:

1. Define the exact gameplay function and camera composition.
2. Use the Image tool to create the actual high-quality game-ready visual pieces for that specific screen/segment.
3. Keep Catpat and all story characters faithful to the supplied book. Poses may change, identity may not. Character face, proportions, colors, eye style, cheek marks and Catpat's characteristic single protruding tooth must remain consistent.
4. Separate visual layers needed for interaction: background, foreground, platforms/terrain, props, HUD frames, buttons, dialogue panels, character art and effects.
5. Only after the visual set is ready, integrate it into the playable game.
6. Browser-test the integrated result on desktop and landscape mobile.
7. If the integrated screen no longer resembles the approved art target, reject it instead of describing it as professional/final.

## Approved visual target

The user approved the rich storybook/mobile-game concept boards generated in chat: lush illustrated forest scenes, warm lantern/festival lighting, layered parchment/wood UI, large expressive scene composition, illustrated level map, comic-style story panels, integrated HUD, illustrated pause menu, companion/festival progression and visually coherent gameplay backgrounds.

The visual target is **not** a plain HTML/CSS card UI placed over old gameplay art. Menus, story scenes and gameplay environments should themselves feel illustrated and authored.

## Next rebuild sequence

Rebuild in small quality-controlled slices:

1. Main menu - final illustrated 16:9 composition using book-faithful Catpat, independent clickable button layers and effects.
2. Story intro - comic layout using book-faithful character artwork, not generated substitute characters.
3. Level map - illustrated forest/festival route with interactive stage markers.
4. Chapter 1 environment kit - Image-produced background, midground, foreground, terrain/platform modules, route landmarks and props designed as one coherent scene family.
5. Chapter 1 gameplay - integrate the environment kit while preserving the corrected scale/pivot and longer route.
6. Chapter 1 mission dialogue/completion - illustrated quest panels and recruited-friend state.
7. Pause/settings/friends screens - same illustrated UI family.
8. Only then proceed to later friends, chapters and festival finale.

### Book fidelity

The supplied book remains the character source of truth. Exact book crops may be used as reference and temporary validation material, but final interactive character sprites/story poses should be newly prepared game assets that preserve the book design. Do not introduce raccoon/dog/acorn/hedgehog-like substitute versions of Catpat.

### Delivery truth

No current Catpat2 playtest is accepted as the professional visual baseline. v0.3 remains a rejected experiment. The next user-facing playable build should only be presented after at least the rebuilt main menu + story + one gameplay scene have been integrated from Image-produced assets and visually reviewed against the approved concept target.
