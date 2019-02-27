const canvg = require('../src/canvg.js'),
  Canvas = require('canvas'),
  path = require('path'),
  Promise = require('bluebird'),
  fs = Promise.promisifyAll(require('fs')),
  PNGImage = Promise.promisifyAll(require('pngjs-image'));

const file = process.argv[2];
const start = process.argv[3] || 0;
const end = process.argv[4];

const basePath = `${__dirname}/../svgs/`;
const files = !file || file === 'all' ? fs.readdirSync(basePath) : [file];

const fileNames = files.slice(start, end || files.length).map((file) => {
  return path.resolve(`${basePath}${file}`);
});

(async () => {
  async function loadImageBuffers (svgbuffers) {
    let images;
    try {
      console.log('Loading image buffers...');
      images = await Promise.all(svgbuffers.map(([fileName, svgbuffer]) => {
        const svg = svgbuffer.toString('utf-8');

        let canvas;
        try {
          canvas = Canvas.createCanvas(800, 600);
        } catch (err) {
          console.error(`Error creating canvas for ${fileName}`, err);
          return;
        }

        console.log(`Trying canvas for ${fileName}`);
        try {
          canvg(canvas, svg, {
            ignoreMouse: true,
            ignoreAnimation: true,
            xmldom: {
              errorHandler: function (/* level, msg */) {} // supress xmldom warnings
            }
          });
        } catch (err) {
          console.error(`Error in canvg with ${fileName}`, err);
          return;
        }

        try {
          const canvasBuffer = canvas.toBuffer();
          return PNGImage.loadImageAsync(canvasBuffer).then((image) => [fileName, image]);
        } catch (err) {
          console.error('Error loading image buffer', err);
          return;
        }
      }));
    } catch (err) {
      console.error('Error loading image', err);
    }
    console.log('Begin writing...');
    images.filter(i => i).forEach(([fileName, image]) => {
      const expectedPath = `${__dirname}/expected/${path.basename(fileName)}.png`;
      console.log(`Writing: ${expectedPath}...`);
      image.writeImage(path.resolve(expectedPath));
    });
    console.log('Finished processing!');
  }
  try {
    console.log('Getting svg buffers...');
    const svgbuffers = await Promise.all(fileNames.map((fileName) => {
      if (!fs.existsSync(fileName)) {
        throw new Error(`${fileName} does not exist!`);
      }
      return fs.readFileAsync(fileName).then((svgbuffer) => [fileName, svgbuffer]);
    }));

    await loadImageBuffers(svgbuffers);
  } catch (err) {
    console.error(err);
  }
})();
