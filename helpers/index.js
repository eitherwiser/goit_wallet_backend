// file-system
const renameFile = require("./file-system/renameFile.js");
const imgNormalize = require("./file-system/imgNormalize.js");

// email
const sendEmail = require("./email/sendEmail.js");

//transaction
const { countTheBalance } = require("./transaction/countTheBalance");
const {
  getTransactionsWithName,
} = require("./transaction/getTransactionsWithName");
const { addCategoryIdName } = require("./transaction/addCategoryIdName");
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
  getTransactionsWithName,
  addCategoryIdName,
  //statistic
  amountByCategory,
  amountByTransactionType,
  addAmountToCategoryObj,
};
