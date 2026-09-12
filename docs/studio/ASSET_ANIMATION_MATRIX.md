# Catpat2 Asset & Animation Production Matrix

## Catpat canonical gameplay package
Canvas `512x640`; foot pivot `(256,620)`; right-facing canonical art; left is exact runtime mirror unless a story-specific asymmetry is explicitly required.

Required authored families:
- idle: 8 unique frames
- run: accepted 8-frame baseline, extend toward 10 only if cadence requires
- takeoff: 3
- rise: 4
- apex: 2
- fall: 4
- land impact/recovery: 5
- listen: 6
- talk gesture A: 8
- talk gesture B: 8
- surprised: 6
- worried/thinking: 6
- happy nod: 6
- celebrate: 8–10 unique authored frames

Target distinct Catpat gameplay/acting poses: 80+ before portrait-only variants.

Each accepted frame must preserve head envelope, eye spacing, muzzle, characteristic tooth, yellow crest, coral cheek/nose accents, peach belly, red boots, childlike proportions, tail attachment and grounded foot baseline.

## Verified principal companions
### Pıtpıt
Warm gray-brown rabbit; large upright ears with coral/pink inner ears; coral cheeks; small peach-pink nose; white whiskers; large eyes/eyelashes; rounded tail. Required: idle/move/talk/listen/sad-or-concerned/happy/thankful/celebrate plus 4–6 comic portraits and daisy-garden mission poses.

### Porsuk
Dark charcoal body; pale gray face stripe; pink inner ears; coral cheeks; long pointed snout/black nose; large eyes. Current v0.6 visual identity may be reused only where book-fidelity QA passes; final animation still requires authored package.

### Maymun
Warm brown monkey; large rounded pink inner ears; beige muzzle/belly; coral cheeks; thin curved tail; large eyes. Required for the branch-game event with Porsuk.

### Market cashier
Purple hippo cashier verified from the market scene. Produce only the states needed for queue/interaction/comic delivery.

`Baykuş` and `Civciv` are not accepted named runtime companions unless later book evidence explicitly establishes them. Existing v0.6 slots are replacement-required.

## UI matrix
Finished visuals are image-authored.
Main menu: hero background, logo, primary button normal/pressed/disabled, secondary buttons/icons, hit-map metadata.
Chapter map: base plate, route, active/completed/locked nodes, location/festival markers, baked fixed labels, dynamic-only safe areas.
Pause/settings: authored plates, buttons, toggles/sliders.
HUD: objective/counter/pause/prompt/checkpoint/success frames.
Results: chapter-complete, friend-joined, rewards and retry/fail visuals when needed.

## Comic matrix
Left/right/two-character panel frames, establishing/resolution panels, speech/thought/emphasis balloon families, narrator caption if used, continue/next affordance.

## Chapter 1 environment matrix
At least six visual zones: warm forest/festival outskirts, creek transition, stone/waterfall zone, recovery grove, mission transition area, festival approach. Each requires far/mid layers, safe foreground, landmark, platform compatibility and Catpat contrast QA.

## Physical-art metadata
Every platform/hazard/interactive object records native size, intended scale, pivot, walkable/danger polygon, visible contact edge, allowed scale range, collision role, mobile readability and QA status.