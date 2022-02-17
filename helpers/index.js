// file-system
const renameFile = require("./file-system/renameFile.js");
const imgNormalize = require("./file-system/imgNormalize.js");

// email
const sendEmail = require("./email/sendEmail.js");

//transaction
const { amountByCategory } = require("./statistic/amountByCategory");
const {
  amountByTransactionType,
} = require("./statistic/amountByTransactionType");
const { countTheBalance } = require("./transaction/countTheBalance");
const {
  addAmountToCategoryObj,
} = require("./statistic/addAmountToCategoryObj");

module.exports = {
  // file-system
  imgNormalize,
  renameFile,
  // email
  sendEmail,
  //transaction
  countTheBalance,
  //statistic
  amountByCategory,
  amountByTransactionType,
  addAmountToCategoryObj,
};
