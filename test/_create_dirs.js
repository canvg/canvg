const path = require("path"),
  Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  mkdirp = require("mkdirp"),
  mkdirAsync = Promise.promisify(mkdirp);

/**
 * Create folders for actual generates files and diff between
 * then and expected result
 *
 * @param  {string}   folder_actual  The folder for actual generated images
 * @param  {string}   folder_diff    The folder for differences
 * @return {Promise}  { description_of_the_return_value }
 */
async function createDirs(folder_actual, folder_diff, group) {
  let oldUmask = process.umask(0);

  await mkdirAsync(folder_actual);
  await mkdirAsync(folder_diff);
  process.umask(oldUmask);

  let actual_files = await fs.readdirAsync(folder_actual);
  let diff_files = await fs.readdirAsync(folder_diff);

  let removal_actual_files = actual_files.map(file => {
    if (!group || file.indexOf(group) === 0) {
      return fs
        .unlinkAsync(path.resolve(`${folder_actual}/${file}`))
        .catch((/* err */) => {});
    }
    return;
  });
  let removal_diff_files = diff_files.map(file => {
    if (!group || file.indexOf(group) === 0) {
      return fs
        .unlinkAsync(path.resolve(`${folder_diff}/${file}`))
        .catch((/* err */) => {});
    }
    return;
  });

  await Promise.all(removal_actual_files);
  await Promise.all(removal_diff_files);
}

module.exports = createDirs;
