export function gestureAxis(dx, dy) {
  if (Math.hypot(dx, dy) < 8) return null;
  return Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
}
export function releaseGesture({ axis, dx, dy, vx = 0, active, count, flipped }) {
  if (axis === 'vertical') return { active, flipped: dy > 35 ? true : dy < -35 ? false : flipped };
  if (axis === 'horizontal' && (Math.abs(dx) > 40 || (Math.abs(dx) > 12 && Math.abs(vx) > .5))) {
    return { active: Math.max(0, Math.min(count - 1, active + (dx < 0 ? 1 : -1))), flipped: false };
  }
  return { active, flipped };
}
