var canvg = require('../canvg'),
    Canvas = require('canvas'),
    path = require('path'),
    Promise = require('bluebird'),
    fs = Promise.promisifyAll(require("fs")),
    BlinkDiff = require('blink-diff'),
    mkdirp = require('mkdirp'),
    mkdirAsync = Promise.promisify(mkdirp),
    PNGImage = Promise.promisifyAll(require('pngjs-image')),
    test = require('ava');



const actual_folder = path.resolve(`${__dirname}/actual`),
    diff_folder = path.resolve(`${__dirname}/diff`);
async function createDirs() {

    let oldUmask = process.umask(0);



    await mkdirAsync(actual_folder);
    await mkdirAsync(diff_folder);


    process.umask(oldUmask);

}

test.before(async t => {
    await createDirs();
});



const diff = [];
let logged = false;

let files = fs.readdirSync(path.resolve(`${__dirname}/../svgs`));

async function runDiff(diffInstance) {
    return new Promise((resolve, reject) => {
        diffInstance.run(function(error, result) {
            if (error) {
                reject(error);
            } else {
                let res = diffInstance.hasPassed(result.code) ? true : false;
                //console.log('Found ' + result.differences + ' differences.');
                resolve({ res, differences: result.differences });
            }
        });
    });
}



while (files.length) {
    let f = files.pop();
    test.serial(`comparing ${f}`, async t => {
        var svgbuffer = await fs.readFileAsync(path.resolve(`${__dirname}/../svgs/${f}`));
        var svg = svgbuffer.toString('utf-8');
        var canvas = new Canvas(800, 600);
        canvg(canvas, svg, { ignoreMouse: true, ignoreAnimation: true, ImageClass: Canvas.Image });
        var buf = canvas.toBuffer();

        var svgImage = await PNGImage.readImageAsync(path.resolve(`${__dirname}/expected/${f}.png`));

        let actual_path = path.resolve(`${__dirname}/actual/${f}.png`);
        await fs.writeFileAsync(actual_path, buf);

        var diff = new BlinkDiff({
            imageA: svgImage, // Use file-path
            imageB: buf,

            thresholdType: BlinkDiff.THRESHOLD_PERCENT,
            threshold: 0.03, // 1% threshold
            delta: 50, // Make comparison more tolerant

            outputMaskRed: 0,
            outputMaskBlue: 255, // Use blue for highlighting differences

            imageOutputPath: `${diff_folder}/${f}.png`,
            imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT
        });
        let { res, differences } = await runDiff(diff);
        if (!res) {
            t.fail(`${f}.png has ${differences} differences with compared file`);
        } else {
            t.truthy(res);
        }


    });
}