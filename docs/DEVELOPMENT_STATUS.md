# Catpat2 development status

## v0.2 - professional vertical slice

Implemented and browser-checked on `chatgpt/development` as the current local playtest milestone:

- Landscape illustrated menu using layered Image-produced UI assets.
- Book-faithful green Catpat and book-derived Pitpit character art.
- Level-selection map with the first mission unlocked.
- Three-panel comic-style mission introduction.
- Playable Pitpit daisy-help mission with real gaps/platforms.
- Catpat uses the approved eight-frame run clip at 10 FPS plus jump/fall/land states.
- Touch + keyboard controls, pause overlay, quest HUD, collection feedback and completion reward.
- Helped Pitpit is stored as the first recruited friend when storage is available.

QA: Chromium browser flow was exercised at 1280x720 and 844x390. Menu -> map -> comic -> game -> movement/jump -> pause completed with zero page errors and no document overflow.

Important delivery truth: the self-contained v0.2 playtest and its binary image assets are not yet fully committed to GitHub. Do not call the GitHub game delivery complete until the actual playable source/assets are present on this branch. The tested local playtest remains the current reference artifact.

This is a quality milestone, not the finished game. Chapters 2/3, full companion animation, final sound/music, save UI, accessibility settings and festival endgame remain open. Do not hand off to Claude unless the user explicitly asks. Do not merge to `main` or deploy.
