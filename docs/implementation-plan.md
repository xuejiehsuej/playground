# Playground / spatial collection

Approved scope: industrial space museum with digital, ocean and Infinity Castle-inspired environments. These are environments, not completed exhibits. Future self-made works have independent categories and URLs. All development remains in E:/my4web/playground with local preview.

Architecture: authored static ES modules in dist, local Three.js dependency, no remote assets or runtime CDN. Real-time geometry creates all spatial imagery. DOM provides navigation and accessible controls; WebGL provides actual freely rotating environments. Space transitions fade through a short camera approach and rebuild only the active environment, disposing GPU resources. Reduced-motion preferences remove automatic motion. Hidden tabs pause rendering.

## Implementation sequence
- [x] Define space catalogue and navigation behavior tests (unknown hashes, collection filtering, camera limits).
- [x] Author dist/index.html, style.css and favicon.svg: coherent HUD, hero, space navigation, collection dialog, controls and mobile layout.
- [x] Author dist/worlds.js: procedural industrial hub, digital lattice, ocean shader and interlocking lantern architecture.
- [x] Author dist/navigation.js and app.js: unrestricted orbit, pan, dolly, roll, keyboard and touch; portal picking; transitions; reset; hash navigation; quality/reduced-motion; accessible dialogs.
- [x] Run local server on 4180, hand off meaningful preview, then inspect screenshots and exercise all four spaces and controls.
- [x] Run focused browser acceptance including mobile, reduced motion, collection empty state, renderer errors and repeat transitions; record honest limitations and instructions.

Acceptance: all four environments visibly distinct; all entrances/return/reset work; drag changes viewpoint, zoom changes position, roll and pitch can invert view, map can rescue users from any view; works count is zero and no invented exhibits; collection offers real categories and empty state; no external dependencies in browser; UI fits desktop and phone; buildless entrypoints and module syntax valid.
