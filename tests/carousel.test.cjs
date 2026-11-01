const { test, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
let gestureAxis, releaseGesture;
before(async () => {
  ({ gestureAxis, releaseGesture } = await import('data:text/javascript;base64,' + fs.readFileSync('src/carouselGestures.js').toString('base64')));
});
const swipe = extra => releaseGesture({ axis: 'horizontal', dx: 0, dy: 0, active: 1, count: 4, flipped: false, ...extra });
test('left selects next card; right selects previous and resets the back', () => {
  assert.deepEqual(swipe({ dx: -80, flipped: true }), { active: 2, flipped: false });
  assert.equal(swipe({ dx: 80 }).active, 0);
});
test('down always shows the back, even on repeated downward swipes', () => {
  assert.deepEqual(swipe({ axis: 'vertical', dy: 70 }), { active: 1, flipped: true });
  assert.equal(swipe({ axis: 'vertical', dy: 70, flipped: true }).flipped, true);
  assert.equal(swipe({ axis: 'vertical', dy: -70, flipped: true }).flipped, false);
});
test('short gestures do not change cards; edges cannot overflow', () => {
  assert.equal(swipe({ dx: -5, vx: -1 }).active, 1);
  assert.equal(swipe({ active: 0, dx: 100 }).active, 0);
  assert.equal(swipe({ active: 3, dx: -100 }).active, 3);
  assert.equal(swipe({ dx: -20, vx: -.8 }).active, 2);
});
test('direction locks after threshold and vertical gestures preserve selection', () => {
  assert.equal(gestureAxis(2, 3), null);
  assert.equal(gestureAxis(-30, 10), 'horizontal');
  assert.equal(gestureAxis(10, 30), 'vertical');
  assert.equal(swipe({ axis: 'vertical', dx: -80, dy: 90 }).active, 1);
});
