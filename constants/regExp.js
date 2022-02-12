/* eslint-disable spaced-comment */

const phoneRegExp =
  /^([+][\d{1}][-\s]?[\d{1}][-\s]?)?([(]?\d{3}[)]?)([-\s]?\d{3})(([-\s]?\d{2}[-\s]?\d{2})|([-\s]?\d{4}))$/;

const emailRegExp =
  /^((?![._-])[a-zA-Z0-9]{0,1}?)+([._-]?[a-zA-Z0-9]{0,64}?)+((?![._-])[a-zA-Z0-9]{1}?)+@((?![._-])[a-zA-Z0-9]{0,1}?)+([._:-]?[a-zA-Z0-9]{0,32}?)+((?![._-])[a-zA-Z0-9]{0,1})+(\.[a-zA-Z0-9]{2,3})$/;

module.exports = {
  phoneRegExp,
  emailRegExp,
};
