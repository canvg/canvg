const handler = require('serve-handler'),
    fs = require('fs'),
    path = require('path'),
    http = require('http'),
    bluebird = require('bluebird'),
    puppeteer = require('puppeteer'),
    mkdirp = require('mkdirp'),
    mkdirAsync = bluebird.promisify(mkdirp),
    server = http.createServer((request, response) => {
        // You pass two more arguments for config and middleware
        // More details here: https://github.com/zeit/serve-handler#options
        return handler(request, response);
    }),
    dataUriToBuffer = require('data-uri-to-buffer'),
    BlinkDiff = require('blink-diff'),
    test = require('ava');





/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3123');

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


/*
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind);
}
/**
 * Listen on provided port, on all network interfaces.
 */


server.on('error', onError);
server.on('listening', onListening);
server.on('close', function() {
    console.log('Closing Server');
});


server.listen(3123, () => {
    console.log(`Running at http://localhost:${port}`);
});

function launchBrowser() {
    return puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
}

async function openPage(browser, testcase, t) {


    let address = `http://localhost:3123/test?test=${testcase}`;

    const page = await browser.newPage();
    const handleClose = async(err) => {
        t.log('handleClose', err.message);

        await page.evaluate(() => {
            let final_result = document.createElement('div');
            final_result.id = 'final_result';
            document.body.appendChild(final_result);
            return Promise.resolve(document);
        });

        throw err;

    };
    page.on('console', msg => {

        if (String(msg.type) === 'error') {

            return handleClose(new Error(msg.text));
        }

        for (let i = 0; i < msg.args.length; ++i) {
            t.log(`console msg ${i}: ${msg.args[i]}`);
        }
    });


    page.on('error', (err) => {
        return handleClose(err);

    });

    page.on('pageerror', (err) => {
        return handleClose(err);
    });

    t.log('Will navigate to ', address);

    await page.goto(address);

    try {
        await page.waitForSelector('#final_result');

        await page.waitFor(100);



        let { result, canvas_dataurl, svg_dataurl } = await page.evaluate(() => {
            let result = document.getElementById('final_result');
            let canvas_dataurl = document.getElementById('canvasimg').src;
            let svg_dataurl = document.getElementById('img').src;
            return Promise.resolve({ result, canvas_dataurl, svg_dataurl });
        });

        await page.close();

        return { result, canvas_dataurl, svg_dataurl };

    } catch (err) {
        t.log(err.message);
        await page.close();

        return { result: false, canvas_dataurl: null, svg_dataurl: null };

    }


}

var files = fs.readdirSync(path.resolve(`${__dirname}/../svgs`));

let browser;

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

let diff_folder = path.resolve(`${__dirname}/diff_browser`);
async function createDirs() {

    let oldUmask = process.umask(0);
    await mkdirAsync(diff_folder);
    process.umask(oldUmask);

}


test.before(async t => {
    await createDirs();
    browser = await launchBrowser();
});


while (files.length) {
    let testcase = files.pop();

    test.serial(`comparing results for ${testcase}`, async t => {

        try {
            let { result, canvas_dataurl, svg_dataurl } = await openPage(browser, testcase, t);

            let canvasBuffer = dataUriToBuffer(canvas_dataurl),
                svgBuffer = dataUriToBuffer(svg_dataurl);

            var diff = new BlinkDiff({
                imageA: canvasBuffer, // Use file-path
                imageB: svgBuffer,

                thresholdType: BlinkDiff.THRESHOLD_PERCENT,
                threshold: 0.03, // 1% threshold
                delta: 50, // Make comparison more tolerant

                outputMaskRed: 0,
                outputMaskBlue: 255, // Use blue for highlighting differences

                imageOutputPath: `${diff_folder}/${testcase}.png`,
                imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT
            });
            let { res, differences } = await runDiff(diff);
            if (!res) {
                t.fail(`${testcase}.png has ${differences} differences with compared file`);
            } else {
                t.truthy(res);
            }
        } catch (err) {
            t.fail(err.message);
        }
    });

}




test.after(async t => {
    await browser.close();
    console.log('closed puppeteer');

    setTimeout(() => {
        server.close();
    }, 5000);
    return;
});