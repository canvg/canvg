# canvg

[![Build Status](https://travis-ci.com/canvg/canvg.svg?branch=master)](https://travis-ci.com/canvg/canvg)
[![npm](https://img.shields.io/npm/dm/canvg.svg)](https://www.npmjs.com/package/canvg)
[![](https://data.jsdelivr.com/v1/package/npm/canvg/badge?style=rounded)](https://www.jsdelivr.com/package/npm/canvg)

## Looking for Contributors

In an attempt to keep this repo more active and merge PRs and do releases, if you would like to be a contributor, please start a conversation with me at gabelerner at gmail. The prerequisite is to have a few PRs open to prove out an understanding of the code.  Thanks!

## Introduction

canvg is a SVG parser and renderer. It takes a URL to a SVG file or the text of an SVG file, parses it in JavaScript, and renders the result on a [Canvas](http://dev.w3.org/html5/2dcontext/) element.  The rendering speed of the examples is about as fast as native SVG.

## What's implemented?

The end goal is everything from the [SVG spec](http://www.w3.org/TR/SVG/). The majority of the rendering and animation is working.  If you would like to see a feature implemented, don't hesitate to contact me or add it to the issues list.

## Potential uses

* Allows for inline embedding of SVG through JavaScript (w/o having to request another file or break validation)
* Allows for single SVG version across all browsers that support Canvas
* Allows for mobile devices supporting Canvas but not SVG to render SVG
* Allows for SVG -> Canvas -> png transition all on the client side (through [toDataUrl](http://www.w3.org/TR/html5/the-canvas-element.html#dom-canvas-todataurl))

## Example Demonstration

[hosted](http://canvg.github.io/canvg/examples/index.htm)

[jsfiddle playground](http://jsfiddle.net/6r2jug6o/2590/)

Locally, you can run `npm start` and view the examples at [http://localhost:3123/examples/index.htm](http://localhost:3123/examples/index.htm)

## Building

`npm run build` then look in the `dist` folder

## Testing

- `npm run test-node` runs tests on `node`
- `npm run test-browser` runs tests on `browser`
- `npm run generate-expected foo.svg` to create the expected png for a given svg in the `svgs` folder

## Usage on the server

`npm install canvg canvas@^2 jsdom@^13 xmldom@^0`

The dependencies required on the server only are peers so must be installed
alongside the canvg package.

**Older version**

`npm install canvg@^1.5`

## Usage on the browser

For browser applications with a build process, canvg can be installed using `npm` similar to use on the server. Note in this case the peer dependencies are not required so do not need to be installed.

Alternatively, canvg can be included directly into a webpage:
```html
<!-- Required to convert named colors to RGB -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/canvg/1.4/rgbcolor.min.js"></script>
<!-- Optional if you want blur -->
<script src="https://cdn.jsdelivr.net/npm/stackblur-canvas@^1/dist/stackblur.min.js"></script>
<!-- Main canvg code -->
<script src="https://cdn.jsdelivr.net/npm/canvg/dist/browser/canvg.min.js"></script>
```

Put a canvas on your page
```html
<canvas id="canvas" width="1000px" height="600px"></canvas>
```

Example canvg calls:
```html
<script>
window.onload = function() {
  //load '../path/to/your.svg' in the canvas with id = 'canvas'
  canvg('canvas', '../path/to/your.svg')

  //load a svg snippet in the canvas with id = 'drawingArea'
  canvg(document.getElementById('drawingArea'), '<svg>...</svg>')

  //ignore mouse events and animation
  canvg('canvas', 'file.svg', { ignoreMouse: true, ignoreAnimation: true })
}
</script>
```

The third parameter is options:
* log: true => console.log information
* ignoreMouse: true => ignore mouse events
* ignoreAnimation: true => ignore animations
* ignoreDimensions: true => does not try to resize canvas
* ignoreClear: true => does not clear canvas
* offsetX: int => draws at a x offset
* offsetY: int => draws at a y offset
* scaleWidth: int => scales horizontally to width
* scaleHeight: int => scales vertically to height
* renderCallback: function => will call the function after the first render is completed
* forceRedraw: function => will call the function on every frame, if it returns true, will redraw
* useCORS: true => will attempt to use CORS on images to not taint canvas

You can call canvg without parameters to replace all svg images on a page. See the
[example](http://canvg.github.io/canvg/examples/convert.htm).

There is also a built in extension method to the canvas context to draw svgs similar to the way [drawImage](http://www.w3.org/TR/2dcontext/#dom-context-2d-drawimage) works:
```javascript
var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
ctx.drawSvg(SVG_XML_OR_PATH_TO_SVG, dx, dy, dw, dh);
```
