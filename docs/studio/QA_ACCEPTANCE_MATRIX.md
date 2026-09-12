# Catpat2 QA Acceptance Matrix

Primary targets: desktop `1280x720`; landscape mobile `844x390`; portrait safety/orientation `390x844`.

## Character QA
Every canonical clip must pass silhouette, facial identity, palette, tooth/crest/boot/feature stability, real alpha, no halo, stable pivot, grounded baseline, no crop, genuinely distinct poses and loop closure. Hash uniqueness is necessary but not sufficient.

Idle: feet planted; no whole-sprite transform as primary acting; authored breath/eye/crest motion; no snap.
Run: contact/down/passing/up phases read; no foot skating; stable mass arc; tail/arm follow-through.
Jump: authored takeoff/rise/apex/fall/landing; no airborne run loop; no transition pop.

## Book-fidelity QA
Every named runtime character must have source-book evidence. Compare silhouette, proportions, face construction, eye spacing, muzzle/beak/ears, palette/markings, clothing/accessories, relative scale, emotional acting and rendering language. Book-external/unknown named characters are `replacement-required`, not temporary-final.

Every final mission/story event must also be supported by the book or explicitly approved as an adaptation. A book-faithful character placed in an invented final story beat does not automatically pass.

## UI QA
No visible CSS/canvas rectangle may function as finished artwork. Fixed copy should be integrated into authored art where practical; Turkish spelling/diacritics correct; no clipping at desktop/mobile targets; irregular visual art retains usable hit regions; characters do not collide with copy/control art.

## Comic QA
Speakers unambiguous; balloon tails correct; balloons do not cover expressions; reading order clear; phone-readable line length; consistent crops/eye line; never a scanned full book page.

## Environment QA
Catpat readable against immediate background; lane not same-value green; platform tops obvious; foreground never hides mandatory gameplay information; progression landmarks read; lighting coherent.

## Physical contact QA
Platform walkable surface matches painted top; foot pivot meets visible surface within 2 px; slope collider follows art; native aspect ratio preserved; no invisible ledges.

Hazard danger region follows visible danger; mandatory route lies inside measured envelope with mobile touch tolerance; safe landing exists; no unavoidable off-camera strike.

## Gameplay route QA
Standing-start feasibility where required, normal-run feasibility, mobile-touch feasibility, safe recovery after failure, safe checkpoints, no collectible requiring impossible recovery, optional hard path cannot block main progression.

## Current Catpat2 v0.6 mandatory regression points
- thorn at runtime x=2500 must be practically traversable or redesigned/removed;
- idle duplicate-frame family cannot pass as final animation;
- celebrate duplicate-frame family cannot pass as final animation;
- Baykuş/Civciv runtime/menu references cannot pass final book-canon gate;
- coded HUD/pause/map panels cannot pass final image-first UI gate.

## Severity
P0 blockers: cannot start, impossible progression, broken restart/save, missing critical runtime art.
P1 blockers: wrong/book-external identity, invented final mission, fake duplicate animation, running in air, floating contact, unreadable comic/UI, coded final UI.
P2: polish/seam/timing/secondary overlap.
P3: optional backlog.

No production milestone closes with P0 or P1 in shipped scope.