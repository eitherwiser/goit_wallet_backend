const Joi = require("joi");

const joiTransactionValidation = Joi.object({
  isIncome: Joi.boolean().required(),
  amount: Joi.number().min(0.01).required(),
  date: Joi.date().required(),
  category: Joi.string().required(),
  comment: [Joi.string(), Joi.number()],
});

module.exports = {
  joiTransactionValidation,
};
