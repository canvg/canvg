const canvg = require("../src/canvg.js"),
  Canvas = require("canvas"),
  path = require("path"),
  Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  PNGImage = Promise.promisifyAll(require("pngjs-image"));

async function getBuffersNode(file) {
  const svgbuffer = await fs.readFileAsync(
      path.resolve(`${__dirname}/../svgs/${file}`)
    ),
    svg = svgbuffer.toString("utf-8"),
    canvas = Canvas.createCanvas(800, 600);

  canvg(canvas, svg, {
    ignoreMouse: true,
    ignoreAnimation: true,
    xmldom: {
      errorHandler: function(/* level, msg */) {} // supress xmldom warnings
    }
  });
  const canvasBuffer = canvas.toBuffer();
  const expectedImg = await PNGImage.readImageAsync(
    path.resolve(`${__dirname}/expected/${file}.png`)
  );
  return { canvasBuffer, expectedImg };
}

module.exports = getBuffersNode;
