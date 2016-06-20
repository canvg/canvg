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

files.forEach(function (f, index) {
    console.log(index, f);
    var svg = fs.readFileSync(path.join('..', 'svgs', f)).toString('utf-8');
    var canvas = new Canvas(800, 600);
    canvg(canvas, svg, { ignoreMouse: true, ignoreAnimation: true , ImageClass : Canvas.Image});
    var buf = canvas.toBuffer();
    try {
        var expected = path.join('expected', f + '.png');
        fs.statSync(expected);
        //compare with expected if existed.
        assert.deepEqual(buf, fs.readFileSync(expected));
    } catch (e) {
        console.error(index, f, 'not existed');
    }
    fs.writeFileSync(path.join(actual, f + '.png'), buf);
});