var path = require("path"),
  Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  createDirs = require(path.resolve(`${__dirname}/_create_dirs.js`)),
  runDiff = require(path.resolve(`${__dirname}/_run_diff.js`)),
  getBuffersNode = require(path.resolve(`${__dirname}/_get_buffers_node.js`)),
  svgs = require(path.resolve(`${__dirname}/_svgs.js`)),
  test = require("ava");

const actual_folder = path.resolve(`${__dirname}/actual_node`),
  diff_folder = path.resolve(`${__dirname}/diff_node`);

test.before(async (/* t */) => {
  await createDirs(actual_folder, diff_folder);
});

const testFile = (file, group) => {
  let description = svgs[group][file],
    actual_path = path.resolve(`${actual_folder}/${group}_${file}.png`),
    actual_file;
  test(`comparing results for ${file} (${description})`, async t => {
    return getBuffersNode(file)
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
