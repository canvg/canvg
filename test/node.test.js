var path = require('path'),
  Promise = require('bluebird'),
  fs = Promise.promisifyAll(require("fs")),
  createDirs = require(path.resolve(`${__dirname}/_create_dirs.js`)),
  runDiff = require(path.resolve(`${__dirname}/_run_diff.js`)),
  getBuffersNode = require(path.resolve(`${__dirname}/_get_buffers_node.js`)),
  svgs = require(path.resolve(`${__dirname}/_svgs.js`)),
  test = require('ava');




const

  actual_folder = path.resolve(`${__dirname}/actual_node`),
  diff_folder = path.resolve(`${__dirname}/diff_node`);



test.before(async t => {
  await createDirs(actual_folder, diff_folder);

});


for (let file in svgs['broken']) {
  let description = svgs['broken'][file];

  test(`comparing results for ${file} (${description})`, async t => {
    try {
      let { canvasBuffer, expectedImg } = await getBuffersNode(file);
      let actual_path = path.resolve(`${actual_folder}/broken_${file}.png`);

      try {
        let { res, differences } = await runDiff(canvasBuffer, expectedImg, `${diff_folder}/broken__${file}.png`, 0.02);
        if (!res) {

          await fs.writeFileAsync(actual_path, canvasBuffer);
          t.log(`${file}.png has ${differences} differences with compared file`);
          t.truthy.skip(`skip broken ${file}`);
        } else {
          t.truthy(res);
        }
      } catch (err) {
        t.log(err.message);
        t.truthy.skip(`skip broken ${file}`);
      }
    } catch (err2) {
      t.log(err2.message);
      t.truthy.skip(`skip broken ${file}`);
    }

  });
}


for (let file in svgs['passing']) {
  let description = svgs['passing'][file];

  test(`comparing results for ${file} (${description})`, async t => {

    let { canvasBuffer, expectedImg } = await getBuffersNode(file);

    let actual_path = path.resolve(`${actual_folder}/passing_${file}.png`);

    try {
      let { res, differences } = await runDiff(canvasBuffer, expectedImg, `${diff_folder}/passing_${file}.png`, 0.03);
      if (!res) {

        await fs.writeFileAsync(actual_path, canvasBuffer);
        t.log(`${file}.png has ${differences} differences with compared file`);
        t.fail();
      } else {
        t.truthy(res);
      }
    } catch (err) {
      await fs.writeFileAsync(actual_path, canvasBuffer);
      t.log(err.message);
      t.fail();
    }


  });
}
