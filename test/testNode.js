'use strict';

var canvg = require('../canvg'),
    Canvas = require('canvas'),
    path = require('path'),
    fs = require('fs'),
    assert = require('assert');

var actual = path.join('.', 'actual');
try {
    fs.mkdirSync(actual);
} catch (err) {};
var files = fs.readdirSync(path.join('..', 'svgs'));

const diff = [];
files.forEach(function (f, index) {
    var svg = fs.readFileSync(path.join('..', 'svgs', f)).toString('utf-8');
    var canvas = new Canvas(800, 600);
    canvg(canvas, svg, { ignoreMouse: true, ignoreAnimation: true , ImageClass : Canvas.Image});
    var buf = canvas.toBuffer();
    var expected = path.join('.', 'expected', f + '.png');
    fs.writeFileSync(path.join(actual, f + '.png'), buf);
    let pass = false;
    try {
      // TODO: https://github.com/yahoo/blink-diff with threshold
      assert.deepEqual(buf, fs.readFileSync(expected));
      pass = true;
    } catch (err) {
      diff.push(f);
    }
    console.log(f, index, pass);
});
console.log(`${diff.length} / ${files.length} different`);
