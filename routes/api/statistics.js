const express = require("express");
const { BadRequest } = require("http-errors");
const router = express.Router();

const { joiStatisticValidation, authenticate } = require("../../middlewares");

const { Transaction } = require("../../models");

const {
  amountByCategory,
  amountByTransactionType,
} = require("../../helpers/index");

/* энд-поинт на получение подробной статистики 
за месяц и год по транзакциям пользователя*/
router.get("/", authenticate, async (req, res, next) => {
  try {
    const { error } = joiStatisticValidation.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const { _id } = req.user;
    const { year, month } = req.body;

    const transactions = await Transaction.find({
      owner: _id,
      year: year,
      month: month,
    });

    const transactionsExpence = transactions.filter(
      (transaction) => transaction.isIncome === false
    );

    const categoriesTransaction = amountByCategory(transactionsExpence);
    const totalIncome = amountByTransactionType(transactions, true);
    const totalExpence = amountByTransactionType(transactions, false);

    const data = {
      category: { ...categoriesTransaction },
      total: { Expence: totalExpence, Income: totalIncome },
    };

    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
