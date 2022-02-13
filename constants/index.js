// validation
const { phoneRegExp, emailRegExp, userNameRegExp } = require("./regExp.js");

// directories
const { tempDir, avatarsDir } = require("./directories.js");

module.exports = {
  // validation
  phoneRegExp,
  emailRegExp,
  userNameRegExp,
  // directories
  tempDir,
  avatarsDir,
};
