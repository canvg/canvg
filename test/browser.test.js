const fs = require("fs"),
  path = require("path"),
  puppeteer = require("puppeteer"),
  initServer = require(path.resolve(`${__dirname}/_server.js`)),
  openPage = require(path.resolve(`${__dirname}/_openpage.js`)),
  createDirs = require(path.resolve(`${__dirname}/_create_dirs.js`)),
  runDiff = require(path.resolve(`${__dirname}/_run_diff.js`)),
  getBuffersBrowser = require(path.resolve(
    `${__dirname}/_get_buffers_browser.js`
  )),
  svgs = require(path.resolve(`${__dirname}/_svgs.js`)),
  test = require("ava");

function launchBrowser() {
  return puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
}

let port = 3126,
  server = initServer(port),
  browser,
  diff_folder = path.resolve(`${__dirname}/diff_browser`),
  actual_folder = path.resolve(`${__dirname}/actual_browser`);

test.before(async (/* t */) => {
  await createDirs(actual_folder, diff_folder);
  await server.ready.promise();
  browser = await launchBrowser();
});

const testFile = (file, group) => {
  let description = svgs[group][file],
    actual_path = path.resolve(`${actual_folder}/${group}_${file}.png`),
    actual_file;

  test.serial(`comparing results for ${file} (${description})`, async t => {
    return openPage(browser, file, t, port)
      .then(canvas_dataurl => {
        return getBuffersBrowser(file, canvas_dataurl);
      })
      .then(({ canvasBuffer, expectedImg }) => {
        actual_file = canvasBuffer;
        return runDiff(
          canvasBuffer,
          expectedImg,
          `${diff_folder}/${group}_${file}.png`,
          0.03
        );
      })
      .then(async ({ res, differences }) => {
        if (!res) {
          await fs.writeFileAsync(actual_path, actual_file);
          if (group === "broken") {
            t.log(`skip broken ${file}`);
            t.truthy.skip(`skip broken ${file}`);
          } else {
            t.fail(
              `${file}.png has ${differences} differences with compared file`
            );
          }
        } else {
          t.truthy(res);
        }
      })
      .catch(async err => {
        await fs.writeFileAsync(actual_path, actual_file);
        t.log(err);
        t.fail(err.message);
      });
  });
};

for (let file in svgs["broken"]) {
  testFile(file, "broken");
}

for (let file in svgs["passing"]) {
  testFile(file, "passing");
}

test.after(async t => {
  server.close();
  await browser.close();
  t.log("closed puppeteer");
});
