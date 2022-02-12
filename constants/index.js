// validation
const { phoneRegExp, emailRegExp } = require('./regExp.js');

// directories
const { tempDir, avatarsDir } = require('./directories.js');

module.exports = {
  // validation
  phoneRegExp,
  emailRegExp,
  // directories
  tempDir,
  avatarsDir,
};
