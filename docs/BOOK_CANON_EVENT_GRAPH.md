# Catpat2 Book-Canon Event Graph

This document prevents the recovered v0.6 daisy route from being mistaken for the final story structure. Runtime recovery and final narrative production are separate gates.

## Canonical event nodes

### Branch game — Maymun + Porsuk
Book evidence is registered on PDF pages 4 and 10 in `qa/book-character-registry.json`. Maymun and Porsuk are playing with branches; Maymun politely invites Çatpat, and the interaction is revisited in the reflection scene.

Production rule: build the encounter/problem/response/resolution presentation from that verified interaction. Do not invent a substitute animal, unrelated minigame premise, or new moral outcome.

### Pıtpıt daisy garden
Book evidence is registered on PDF pages 5 and 10. Pıtpıt carefully selects daisies for their mother; Çatpat rushes through the garden and damages it. The later reflection states that Çatpat could have passed carefully.

Production rule: the final event must preserve the garden-care conflict. The recovered v0.6 “collect 12 daisies and deliver them to Pıtpıt” route remains movement/collision recovery material only and is not canonical final story logic.

### Market queue
Book evidence is registered on PDF page 6. The scene includes a purple hippo cashier and a queue context affected by Çatpat's behavior; the fox is a verified background secondary character.

Production rule: preserve the queue/courtesy context. Do not promote an invented shop mission or book-external clerk.

### Festival progression framing
The game uses festival progression as its hub/reward framing. Final compositions may use only book-verified characters and must preserve the relationships/identities in the registry. No new dialogue or moral conclusion is considered book-canon unless separately evidenced.

## Runtime migration policy

- `app.js` remains a recovery runtime while canonical art and event assets are produced.
- Baykuş/Civciv slots are replacement-required and may not return to canonical runtime or menu composition without explicit book evidence.
- The root `manifest.json` is the machine-readable event contract.
- `qa/book_event_gate.py` blocks event-graph regression, unverified cast insertion, and accidental promotion of the legacy v0.6 Pıtpıt-only mission as final.
- Character visual promotion still requires page-level visual comparison; text registry evidence alone is not sufficient for final sprite acceptance.
