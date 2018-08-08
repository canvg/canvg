const handler = require('serve-handler'),
  path = require('path'),
  http = require('http'),
  puppeteer = require('puppeteer'),
  server = http.createServer((request, response) => {
    // You pass two more arguments for config and middleware
    // More details here: https://github.com/zeit/serve-handler#options
    return handler(request, response);
  }),
  openPage = require(path.resolve(`${__dirname}/_openpage.js`)),
  createDirs = require(path.resolve(`${__dirname}/_create_dirs.js`)),
  runDiff = require(path.resolve(`${__dirname}/_run_diff.js`)),
  getBuffersBrowser = require(path.resolve(`${__dirname}/_get_buffers_browser.js`)),
  svgs = require(path.resolve(`${__dirname}/_svgs.js`)),
  avaIsRunning = require('ava-is-running');

let test;
if (avaIsRunning()) {
  test = require('ava');
}

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
server.on('close', function () {
  console.log('Closing Server');
});

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});

function launchBrowser() {
  return puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
}

if (avaIsRunning()) {
  let browser,
    diff_folder = path.resolve(`${__dirname}/diff_browser`),
    actual_folder = path.resolve(`${__dirname}/actual_browser`);

  test.before(async t => {
    await createDirs(actual_folder, diff_folder);
    try {
      browser = await launchBrowser();
    } catch (err) {
      t.log(err);

      t.fail(err.message);
    }
  });

  for (let file in svgs.files) {
    let description = svgs.files[file];

    test.serial(`comparing results for ${file} (${description})`, async t => {
      try {
        let canvas_dataurl = await openPage(browser, file, t);
        try {
          let { canvasBuffer, expectedImg } = await getBuffersBrowser(file, canvas_dataurl);
          let { res, differences } = await runDiff(canvasBuffer, expectedImg, `${diff_folder}/${file}.png`);

          if (!res) {
            t.fail(`${file}.png has ${differences} differences with compared file`);
          } else {
            t.truthy(res);
          }
        } catch (err) {
          t.log(err);
          t.fail(err.message);
        }
      } catch (err2) {
        t.log(err2);
        t.fail(err2.message);
      }
    });
  }

  for (let issue in svgs.issues) {
    let description = svgs.issues[issue];

    test.serial(`comparing results for ${issue} (${description})`, async t => {

      try {
        let canvas_dataurl = await openPage(browser, issue, t);

        try {
          let { canvasBuffer, expectedImg } = await getBuffersBrowser(issue, canvas_dataurl);
          let { res, differences } = await runDiff(canvasBuffer, expectedImg, `${diff_folder}/${issue}.png`);

          if (!res) {
            t.fail(`${issue}.png has ${differences} differences with compared file`);
          } else {
            t.truthy(res);
          }
        } catch (err) {
          t.log(err);
          t.fail(err.message);
        }
      } catch (err2) {
        t.log(err2);
        t.fail(err2.message);
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
}
