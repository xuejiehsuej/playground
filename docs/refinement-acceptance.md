# Refinement acceptance — 2026-09-12

User-approved scope: larger and more complex industrial hub; a more ocean-like environment; flowing binary strings; a much denser and more detailed Infinity Castle.

## Delivered

- Industrial: multi-level central deck, side wings, rear platforms, buildings, exposed foundations, articulated ring, plating, bolts, handrails, vents, tanks, ladders and piping. Main scene batch contains 7,020 component instances, with additional ring components in its own batch.
- Digital: 29,060 readable 0/1 glyph instances, animated in three-dimensional falls and a curved tunnel. Removed the old cube sculpture. Existing motion pause is respected.
- Ocean: reflective sea using Three.js Water, multi-scale swell, seamless generated wave normals, layered sky, islands, segmented observation arches with bolt details and tie rods. Underwater: rooted curved kelp, shaped fish bodies and fins, terrain, rocks and observation deck.
- Castle: 570 room units across 16 main levels, rear and outer wings. Shoji grids and handles, tracks, carved transoms, roof tiles and rafters, tatami borders, lantern ribs, stair rails and balconies. 84,191 instances in the main batch, plus rearranging rooms.

## Verification

- Fresh 14-group browser acceptance passed on the final revision: docs/qa/acceptance.json.
- All 3 Node catalogue tests passed; application and all five new world modules passed syntax checks.
- Fixed the reproduced wheel input regression where a projected portal label intercepted scrolling. The existing browser sequence now verifies that route as well.
- Inspected wide and close screenshots for all four spaces, plus updated underwater and mobile images.
- docs/qa/refinement contains wide/close images and an earlier performance/model report. Its ocean-underwater image predates the final kelp/fish refinement; docs/qa/ocean-below.png is the latest underwater evidence.
- No browser JavaScript or shader errors during the final acceptance run.

Performance samples in local headless Edge were approximately 100 FPS, but these are not physical-phone GPU measurements. Mobile validation used a 390 × 844 emulated viewport. This remains a procedural real-time environment; no finished personal exhibits or deployment were added.

Local preview is running at http://127.0.0.1:4180 .
