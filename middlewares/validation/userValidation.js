const Joi = require('joi');
const { BadRequest } = require('http-errors');
const { emailRegExp } = require('../../constants');

const userSignup = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
  avatarURL: Joi.string(),
  subscription: Joi.string().default('starter'),
});

const userLogin = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

const userSubscription = Joi.object({
  subscription: Joi.string().valid('starter', 'business', 'pro').required(),
});

const emailVerification = Joi.object({
  email: Joi.string()
    .pattern(emailRegExp)
    .required('Required field "email" is not match'),
});

const errorWrapper = validationResult => {
  const { error } = validationResult;
  if (error) {
    throw new BadRequest(error.message);
  }
};

const joiUserValidation = async (req, res, next) => {
  if (req.method === 'POST') {
    if (req.originalUrl === '/api/users/signup') {
      await errorWrapper(userSignup.validate(req.body));
    }
    if (req.originalUrl === '/api/users/login') {
      await errorWrapper(userLogin.validate(req.body));
    }
    if (req.originalUrl === '/api/users/verify') {
      await errorWrapper(emailVerification.validate(req.body));
    }
  }
  if (req.method === 'PATCH') {
    if (req.originalUrl === '/api/users/') {
      await errorWrapper(userSubscription.validate(req.body));
    }
  }
  next();
};

module.exports = joiUserValidation;
