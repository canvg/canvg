=Introduction=
canvg is a SVG parser and renderer. It takes a URL to a SVG file or the text of an SVG file, parses it in !JavaScript, and renders the result on a [http://dev.w3.org/html5/2dcontext/ Canvas] element.  The rendering speed of the examples is about as fast as native SVG.

=Donate=
Bitcoin to 14qEGHXYTMAcfa5TMEr6HfhLV6cLGQmiBi

=What's implemented?=
The end goal is everything from the [http://www.w3.org/TR/SVG/ SVG spec]. The majority of the rendering and animation is working.  If you would like to see a feature implemented, don't hesitate to contact me or add it to the [http://code.google.com/p/canvg/issues/list issues].

=Potential uses=
  * Allows for inline embedding of SVG through !JavaScript (w/o having to request another file or break validation)
  * Allows for single SVG version across all browsers that support Canvas
  * Allows for mobile devices supporting Canvas but not SVG to render SVG
  * Allows for SVG -> Canvas -> png transition all on the client side (through [http://www.w3.org/TR/html5/the-canvas-element.html#dom-canvas-todataurl toDataUrl])

=Example Demonstration=
===[http://canvg.googlecode.com/svn/trunk/examples/index.htm view here]===
Tested in Chrome, Firefox, Opera, and IE (through FlashCanvas)

[http://jsfiddle.net/qDmhV/ jsfiddle playground]

=Usage=
Include (or [http://code.google.com/p/canvg/downloads/list download]) the following files in your page:
{{{
<script type="text/javascript" src="http://canvg.googlecode.com/svn/trunk/rgbcolor.js"></script> 
<script type="text/javascript" src="http://canvg.googlecode.com/svn/trunk/StackBlur.js"></script>
<script type="text/javascript" src="http://canvg.googlecode.com/svn/trunk/canvg.js"></script> 
}}}

Put a canvas on your page
{{{
<canvas id="canvas" width="1000px" height="600px"></canvas> 
}}}

Example canvg calls:
{{{
<script type="text/javascript">
window.onload = function() {
  //load '../path/to/your.svg' in the canvas with id = 'canvas'
  canvg('canvas', '../path/to/your.svg')

  //load a svg snippet in the canvas with id = 'drawingArea'
  canvg(document.getElementById('drawingArea'), '<svg>...</svg>')

  //ignore mouse events and animation
  canvg('canvas', 'file.svg', { ignoreMouse: true, ignoreAnimation: true }) 
}
</script>
}}}

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

You can call canvg without parameters to replace all svg images on a page. See the [http://canvg.googlecode.com/svn/trunk/examples/convert.htm example].

There is also a built in extension method to the canvas context to draw svgs similar to the way [http://www.w3.org/TR/2dcontext/#dom-context-2d-drawimage drawImage] works:
{{{
var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
ctx.drawSvg(SVG_XML_OR_PATH_TO_SVG, dx, dy, dw, dh);
}}}

=Related Repositories=
  * [http://code.google.com/p/jscapturecanvas/ Output javascript instead of rendering to canvas]
  * [https://github.com/nathan-muir/canvgc A combo of canvg & jscapturecanvas to compile SVG to Canvas (Server side)]
  * [https://code.google.com/p/svg-edit/ Edit SVG files in your browser]
