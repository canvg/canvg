const Promise = require('bluebird'),
  BlinkDiff = require('blink-diff');

async function runDiff(canvasBuffer, expectedImg, imageOutputPath) {
  const diff = new BlinkDiff({
    imageA: canvasBuffer,
    imageB: expectedImg,

    thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    threshold: 0.03, // 1% threshold
    delta: 50, // Make comparison more tolerant

    outputMaskRed: 0,
    outputMaskBlue: 255, // Use blue for highlighting differences

    imageOutputPath: imageOutputPath,
    imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT
  });

  return new Promise((resolve, reject) => {
    diff.run(function (error, result) {
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
