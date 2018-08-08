const
  fs = require('fs'),
  path = require('path'),
  puppeteer = require('puppeteer'),
  initServer = require(path.resolve(`${__dirname}/_server.js`)),
  openPage = require(path.resolve(`${__dirname}/_openpage.js`)),
  createDirs = require(path.resolve(`${__dirname}/_create_dirs.js`)),
  runDiff = require(path.resolve(`${__dirname}/_run_diff.js`)),
  getBuffersBrowser = require(path.resolve(`${__dirname}/_get_buffers_browser.js`)),
  svgs = require(path.resolve(`${__dirname}/_svgs.js`)),
  test = require('ava');





function launchBrowser() {
  return puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
}


let port = 3126,
  server = initServer(port),
  browser,
  diff_folder = path.resolve(`${__dirname}/diff_browser`),
  actual_folder = path.resolve(`${__dirname}/actual_browser`);

test.before(async t => {
  await createDirs(actual_folder, diff_folder);
  await server.ready.promise();
  browser = await launchBrowser();
});

for (let group in svgs) {
  for (let file in svgs[group]) {
    let description = svgs[group][file];

    test.serial(`comparing results for ${file} (${description})`, async t => {
      try {
        let canvas_dataurl = await openPage(browser, file, t, port);

        let { canvasBuffer, expectedImg } = await getBuffersBrowser(file, canvas_dataurl);
        let actual_path = path.resolve(`${actual_folder}/${group}_${file}.png`);
        try {

          let { res, differences } = await runDiff(canvasBuffer, expectedImg, `${diff_folder}/${group}_${file}.png`, 0.03);

          if (!res) {
            await fs.writeFileAsync(actual_path, canvasBuffer);
            t.fail.skip(`${file}.png has ${differences} differences with compared file`);
          } else {
            t.truthy(res);
          }
        } catch (err) {
          await fs.writeFileAsync(actual_path, canvasBuffer);
          t.log(err);
          t.fail.skip(err.message);
        }

      } catch (err2) {
        t.log(err2);
        t.fail.skip(err2.message);
      }
    });
  }
}

test.after(async t => {
  server.close();
  await browser.close();
  t.log('closed puppeteer');
});
