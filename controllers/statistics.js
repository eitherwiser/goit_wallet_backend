const { BadRequest } = require("http-errors");
const { joiStatisticValidation } = require("../middlewares");
const { Transaction } = require("../models");

const {
  amountByCategory,
  amountByTransactionType,
  addAmountToCategoryObj,
} = require("../helpers");

const getStatistics = async (req, res, next) => {
  try {
    const { error } = joiStatisticValidation.validate(req.query);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { _id, transactionCategories } = req.user;
    const { year, month } = req.query;

    const transactions = await Transaction.find({
      owner: _id,
      year: year,
      month: month,
    });

    const transactionsExpence = transactions.filter(
      (transaction) => transaction.isIncome === false
    );

    const objAmountByCategory = amountByCategory(transactionsExpence);
    const categoryWithSum = addAmountToCategoryObj(
      transactionCategories,
      objAmountByCategory
    );
    const totalIncome = amountByTransactionType(transactions, true);
    const totalExpence = amountByTransactionType(transactions, false);

    const data = {
      category: categoryWithSum,
      total: { Expense: totalExpence, Income: totalIncome },
    };

    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getStatistics };
