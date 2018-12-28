const test = require("ava");
const canvg = require("../src/canvg.js");

test.before((t) => {
  t.context.svg = canvg._build({});
});

test('ToNumberArray', (t) => {
  const ToNumberArray = t.context.svg.ToNumberArray;

  // Should parse mixed-separator lists of integers and real numbers
  t.deepEqual(ToNumberArray(".5"), [0.5]);
  t.deepEqual(ToNumberArray("7 88.8"), [7, 88.8]);
  t.deepEqual(ToNumberArray("1,-2,3,14,5"), [1, -2, 3, 14, 5]);
  t.deepEqual(ToNumberArray(" 1 -0.2   ,3,.14,  5  "), [1, -0.2, 3, 0.14, 5]);

  // Should support the omission of superfluous separators
  t.deepEqual(ToNumberArray("5.5.5"), [5.5, 0.5]);
  t.deepEqual(ToNumberArray("1-2-3"), [1, -2, -3]);
  t.deepEqual(ToNumberArray("1-.4"), [1, -0.4]);
});
