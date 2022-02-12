// file-system
const renameFile = require('./file-system/renameFile.js');
const imgNormalize = require('./file-system/imgNormalize.js');

// email
const sendEmail = require('./email/sendEmail.js');

module.exports = {
  // file-system
  imgNormalize,
  renameFile,
  // email
  sendEmail,
};
