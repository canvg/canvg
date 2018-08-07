var path = require('path'),
    Promise = require('bluebird'),
    fs = Promise.promisifyAll(require("fs")),
    createDirs = require(path.resolve(`${__dirname}/_create_dirs.js`)),
    runDiff = require(path.resolve(`${__dirname}/_run_diff.js`)),
    getBuffersNode = require(path.resolve(`${__dirname}/_get_buffers_node.js`)),
    svgs = require(path.resolve(`${__dirname}/_svgs.js`)),
    test = require('ava');




const actual_folder = path.resolve(`${__dirname}/actual_node`),
    diff_folder = path.resolve(`${__dirname}/diff_node`);

test.before(async t => {
    await createDirs(actual_folder, diff_folder);

});







for (let file in svgs.files) {
    let description = svgs.files[file];

    test.serial(`comparing results for ${file} (${description})`, async t => {

        let { canvasBuffer, expectedImg } = await getBuffersNode(file);

        let actual_path = path.resolve(`${actual_folder}/${file}.png`);

        try {
            let { res, differences } = await runDiff(canvasBuffer, expectedImg, `${diff_folder}/${file}.png`);
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

for (let issue in svgs.issues) {
    let description = svgs.issues[issue];

    test.serial(`comparing results for ${issue} (${description})`, async t => {

        let { canvasBuffer, expectedImg } = await getBuffersNode(issue);

        let actual_path = path.resolve(`${actual_folder}/${issue}.png`);

        try {
            let { res, differences } = await runDiff(canvasBuffer, expectedImg, `${diff_folder}/${issue}.png`);
            if (!res) {

                await fs.writeFileAsync(actual_path, canvasBuffer);
                t.log(`${issue}.png has ${differences} differences with compared file`);
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