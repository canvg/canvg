const path = require("path"),
  Promise = require("bluebird"),
  dataUriToBuffer = require("data-uri-to-buffer"),
  PNGImage = Promise.promisifyAll(require("pngjs-image"));

async function getBuffersBrowser(file, canvas_dataurl) {
  const canvasBuffer = dataUriToBuffer(canvas_dataurl),
    expectedImg = await PNGImage.readImageAsync(
      path.resolve(`${__dirname}/expected/${file}.png`)
    );
  return { canvasBuffer, expectedImg };
}

module.exports = getBuffersBrowser;
