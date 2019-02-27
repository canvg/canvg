const Promise = require("bluebird"),
  BlinkDiff = require("blink-diff");

/**
 * Compares two images with a given threshold
 * If images differ above the threshold, output them to a diff folder
 *
 * @param  {Buffer|}   canvasBuffer     The canvas buffer
 * @param  {<type>}   expectedImg      The expected image
 * @param  {<type>}   imageOutputPath  The image output path
 * @param  {<type>}   threshold        The threshold
 * @return {Promise}  { description_of_the_return_value }
 */
async function runDiff(canvasBuffer, expectedImg, imageOutputPath, threshold) {
  const diff = new BlinkDiff({
    imageA: canvasBuffer,
    imageB: expectedImg,

    thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    threshold: threshold || 0.01, // threshold. 0.01 means 1%
    delta: 50, // Make comparison more tolerant

    outputMaskRed: 0,
    outputMaskBlue: 255, // Use blue for highlighting differences

    imageOutputPath: imageOutputPath,
    imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT
  });

  return new Promise((resolve, reject) => {
    diff.run(function(error, result) {
      if (error) {
        reject(error);
      } else {
        let res = diff.hasPassed(result.code) ? true : false;
        //console.log('Found ' + result.differences + ' differences.');
        resolve({ res, differences: result.differences });
      }
    });
  });
}

module.exports = runDiff;
