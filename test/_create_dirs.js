const path = require('path'),
    Promise = require('bluebird'),
    fs = Promise.promisifyAll(require("fs")),
    mkdirp = require('mkdirp'),
    mkdirAsync = Promise.promisify(mkdirp);

async function createDirs(folder_actual, folder_diff) {

    let oldUmask = process.umask(0);

    await mkdirAsync(folder_actual);
    await mkdirAsync(folder_diff);
    process.umask(oldUmask);

    let actual_files = await fs.readdirAsync(folder_actual);
    let diff_files = await fs.readdirAsync(folder_diff);

    let removal_actual_files = actual_files.map(file => {
        return fs.unlinkAsync(path.resolve(`${folder_actual}/${file}`)).catch(err => {});
    });
    let removal_diff_files = diff_files.map(file => {
        return fs.unlinkAsync(path.resolve(`${folder_diff}/${file}`)).catch(err => {});
    });

    await Promise.all(removal_actual_files);
    await Promise.all(removal_diff_files);
}

module.exports = createDirs;