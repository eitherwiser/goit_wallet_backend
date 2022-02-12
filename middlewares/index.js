const joiUserValidation = require('./validation/userValidation.js');
const authenticate = require('./authorization/authorization.js');
const upload = require('./upload/uploadFile.js');

module.exports = {
  joiUserValidation,
  authenticate,
  upload,
};
