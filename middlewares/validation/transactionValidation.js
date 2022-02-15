const Joi = require("joi");

const joiTransactionValidation = Joi.object({
  isIncome: Joi.boolean().required(),
  amount: Joi.number().min(0.01).required(),
  date: Joi.date().required(),
  category: Joi.string().required(),
  comment: [Joi.string(), Joi.number()],
});

const joiTransactionStatisticValidation = Joi.object({
  year: Joi.number().min(1000).max(9999).required(),
  month: Joi.number().min(1).max(12).required(),
});

module.exports = {
  joiTransactionValidation,
  joiTransactionStatisticValidation,
};
