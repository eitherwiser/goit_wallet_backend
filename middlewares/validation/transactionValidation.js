const Joi = require("joi");

const joiTransactionValidation = Joi.object({
  isIncome: Joi.boolean().required(),
  amount: Joi.number().min(0.01).required(),
  date: Joi.date().required(),
  categoryId: Joi.string().allow(""),
  comment: [Joi.string(), Joi.number()],
});

module.exports = {
  joiTransactionValidation,
};
