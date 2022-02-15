// file-system
const renameFile = require("./file-system/renameFile.js");
const imgNormalize = require("./file-system/imgNormalize.js");

// email
const sendEmail = require("./email/sendEmail.js");

//transaction
const { amountByCategory } = require("./transaction/amountByCategory");
const {
  amountByTransactionType,
} = require("./transaction/amountByTransactionType");
const { countTheBalance } = require("./transaction/countTheBalance");

module.exports = {
  // file-system
  imgNormalize,
  renameFile,
  // email
  sendEmail,
  //transaction
  amountByCategory,
  amountByTransactionType,
  countTheBalance,
};
