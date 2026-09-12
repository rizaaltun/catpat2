# Catpat2 v0.6 Production Baseline

## Scope lock

From 2026-09-12 onward, all production work in this project is based on **Catpat2 v0.6** and belongs to **`rizaaltun/catpat2`**.

- Active repository: `rizaaltun/catpat2`
- Active branch: `chatgpt/development`
- Canonical runtime baseline: Catpat2 v0.6
- `rizaaltun/catpat-game`: legacy/reference only; no new production work
- `main`: untouched unless the user explicitly authorizes a merge
- Deployment, Cloudflare, domain and CNAME changes: forbidden without explicit authorization

## Exact local baseline artifacts

The v0.6 baseline currently being promoted into this repository was verified from the production workspace as:

- `Catpat2-v0.6-source.zip` — SHA-256 `60bfe61f97aa47ce1bfbb61aa13e32fdcdafa1db1d8372fe63ef9020e1867dab`
- `Catpat2-v0.6-mobil-test.html` — SHA-256 `81e6cd0a5e4170dc3441c05d9dfd636a436796809f654358ab267638e4d016d4`
- Unpacked runtime source: 102 files, approximately 40 MiB
- Runtime source composition at lock time: 94 image assets + 8 text/source/QA files

The unpacked source contains `app.js`, `index.html`, QA reports, manifests and the v0.6 image asset tree. The exact source package is the baseline; no similarly named build from another repository may substitute for it.

## Production system applied to this baseline

All previously agreed production rules apply to this exact v0.6 source:

1. Full 30-day professional production roadmap.
2. First-approved book-faithful Çatpat identity is canonical.
3. Complete book PDF is the source of truth for recurring and secondary characters.
4. Book-external or incorrectly interpreted characters and missions are replacement-required, not final content.
5. Final character animation assets are separate transparent PNG files; sprite sheets/concept boards are not canonical runtime sources.
6. Fake/duplicate animation frames are rejected.
7. Finished UI is image-authored; code handles layout, hitboxes, state and dynamic values rather than drawing final decorative boxes.
8. Visual ground contact and collision surfaces must agree.
9. Mandatory hazards must pass measured movement-envelope/reachability QA.
10. QA runs transactionally after every meaningful production/integration batch and again before canonical promotion/commit.
11. Rejected visual experiments are not shown to the user and are never promoted.
12. A local file or orphan Git blob is not considered delivered until it exists at its canonical Git path.

## Immediate migration gate

Before new feature production advances, the repository must contain the v0.6 runtime source and its canonical asset tree. Existing QA/roadmap/book-fidelity work in `chatgpt/development` is retained and applied on top of this runtime baseline.

Once the runtime baseline is present, production resumes from the first unfinished gate: canonical character/side-character fidelity cleanup, book-canon mission replacement, animation completion, environment/hazard QA and image-authored UI migration.
