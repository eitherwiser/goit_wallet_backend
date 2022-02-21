// file-system
const renameFile = require("./file-system/renameFile.js");
const imgNormalize = require("./file-system/imgNormalize.js");

// email
const sendEmail = require("./email/sendEmail.js");

//transaction
const { countTheBalance } = require("./transaction/countTheBalance");
const { castNumberToTrType } = require("./transaction/castNumberToTrType");
//statistic
const { amountByCategory } = require("./statistic/amountByCategory");
const {
  amountByTransactionType,
} = require("./statistic/amountByTransactionType");
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
  castNumberToTrType,
  //statistic
  amountByCategory,
  amountByTransactionType,
  addAmountToCategoryObj,
};
