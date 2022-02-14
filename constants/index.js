// validation
const { phoneRegExp, emailRegExp, userNameRegExp } = require("./regExp.js");

// directories
const { tempDir, avatarsDir } = require("./directories.js");

// transactionCategories
const { transactionCategories } = require("./transactionCategories.js");

module.exports = {
  // validation
  phoneRegExp,
  emailRegExp,
  userNameRegExp,
  // directories
  tempDir,
  avatarsDir,
  // transactionCategories
  transactionCategories,
};
