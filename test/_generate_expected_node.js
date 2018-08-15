const canvg = require("../src/canvg.js"),
  Canvas = require("canvas"),
  path = require("path"),
  Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  PNGImage = Promise.promisifyAll(require("pngjs-image"));

const file = process.argv[2];
const fileName = path.resolve(`${__dirname}/../svgs/${file}`);
if (!fs.existsSync(fileName)) {
  throw new Error(`${fileName} does not exist!`);
}

(async () => {
  const svgbuffer = await fs.readFileAsync(fileName),
    svg = svgbuffer.toString("utf-8"),
    canvas = new Canvas(800, 600);

  canvg(canvas, svg, {
    ignoreMouse: true,
    ignoreAnimation: true,
    ImageClass: Canvas.Image,
    xmldom: {
      errorHandler: function(level, msg) {} // supress xmldom warnings
    }
  });

  const canvasBuffer = canvas.toBuffer();
  const image = await PNGImage.loadImageAsync(canvasBuffer);
  image.writeImage(path.resolve(`${__dirname}/expected/${file}.png`));
})();
