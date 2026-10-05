# First version acceptance — 2026-09-11

Local preview: http://127.0.0.1:4180

Verified on the final application revision using local Edge/Playwright:

- 3 Node tests passed: unknown route fallback, all four space routes, collection filtering.
- All three application modules passed node syntax checks.
- 14 browser acceptance groups passed; full evidence is in qa/acceptance.json.
- Actual 3D drag, Shift-drag, wheel, WASD movement, half-turn roll and reset were exercised.
- Modal keyboard isolation and Escape closing work, including when the search input contains text.
- All four spaces and repeated transitions work, including returning to hub and rendering entrance previews.
- Under-platform and underwater observation positions verified by camera coordinates and inspected screenshots.
- Inverted Infinity Castle viewpoint inspected after revising the initial close-up composition. Spatial reconfiguration control exercised.
- Quality toggles and motion pause state exercised.
- 390 × 844 mobile emulation checked for overflow, touch navigation, map layout and reduced-motion default.
- No console errors, browser runtime errors or WebGL shader errors during acceptance.

Visual evidence: hub.png, digital.png, ocean.png, infinity.png, hub-below.png, ocean-below.png, infinity-inverted.png, mobile-hub.png, mobile-infinity.png, mobile-map.png. Initial overview images preceded the addition of portal preview textures; the later mobile hub image includes them.

Boundaries: browser mobile emulation is not real-device GPU testing. Free observation intentionally permits passing through geometry; this is not a collision-based walking game. There are no completed user exhibits in this version, and the collection correctly reports zero. No deployment was performed.

Project changes are confined to E:/my4web/playground. The local preview server remains running for review.
