const path = require('path');

const avatarsDir = path.normalize(path.resolve('./public/avatars'));
const tempDir = path.normalize(path.resolve('./temp'));

module.exports = {
  avatarsDir,
  tempDir,
};
