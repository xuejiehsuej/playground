import * as T from 'three';

// Each sector keeps its detailed local geometry; turns operate around the city centre.
export function cityMotion(blocks, centre = new T.Vector3(0, 5, -55)) {
  let active = null, pending = 0, revision = 0;
  const axes = [new T.Vector3(0, 0, 1), new T.Vector3(0, 1, 0), new T.Vector3(1, 0, 0)];
  function begin() {
    const axis = axes[revision % 3];
    const component = ['z', 'y', 'x'][revision % 3];
    active = { time: 0, axis, entries: blocks.map(group => {
      const relative = group.position.clone().sub(centre);
      const lane = relative[component] < -18 ? 0 : relative[component] > 18 ? 2 : 1;
      return { group, relative, rotation: group.quaternion.clone(), lane,
        angle: (lane === 1 ? -1 : 1) * (revision % 2 ? -1 : 1) * Math.PI / 2 };
    }) };
    revision++;
  }
  function apply(time) {
    for (const entry of active.entries) {
      const u = T.MathUtils.clamp((time - entry.lane * .38) / 3.2, 0, 1);
      const eased = u * u * u * (u * (u * 6 - 15) + 10);
      const turn = new T.Quaternion().setFromAxisAngle(active.axis, entry.angle * eased);
      // Briefly open the slices to make their separation and depth visible.
      const separation = active.axis.clone().multiplyScalar((entry.lane - 1) * 12 * Math.sin(Math.PI * u));
      entry.group.position.copy(entry.relative).applyQuaternion(turn).add(centre).add(separation);
      entry.group.quaternion.copy(turn).multiply(entry.rotation).normalize();
    }
  }
  return {
    reconfigure(instant = false) {
      pending += 2;
      if (instant) {
        if (active) { apply(4); active = null; }
        while (pending) { pending--; begin(); apply(4); active = null; }
      } else if (!active) { pending--; begin(); }
    },
    update(dt) {
      if (!active) return;
      active.time += Math.max(0, dt);
      apply(active.time);
      if (active.time >= 4) {
        active = null;
        if (pending) { pending--; begin(); }
      }
    },
    get moving() { return !!active || pending > 0; }
  };
}

