const express = require("express");
const { NotFound, BadRequest } = require("http-errors");
const router = express.Router();

const { Transaction, User } = require("../../models");
const { joiTransactionValidation, authenticate } = require("../../middlewares");

/* 
1. Получение всех транзакций пользователя.
2. Создание транзакции.
3. Получение статистики транзакций по месяцу и/или году. 
*/

/*Получение всех транзакций пользователя.*/
router.get("/", authenticate, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const transaction = await Transaction.find(
      { owner: _id },
      "-createdAt -updatedAt"
    );
    res.json(transaction);
  } catch (error) {
    next();
  }
});

/*Реализовать энд-поинт создания транзакции*/
router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = joiTransactionValidation.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { _id, balance } = req.user;
    const { amount, isIncome } = req.body;

    const transactionBalance = countTheBalance(isIncome, balance, amount);

    function countTheBalance(isIncome, balance, amount) {
      return isIncome === true
        ? (balance * 100 + amount * 100) / 100
        : (balance * 100 - amount * 100) / 100;
    }

    console.log(transactionBalance);
    await User.updateOne({ _id }, { balance: transactionBalance });

    const newTransaction = await Transaction.create({
      ...req.body,
      owner: _id,
      balance: transactionBalance,
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
});

/*Реализовать энд-поинт на получение подробной статистики 
за месяц и год по транзакциям пользователя

СЫРОЙ ВАРИАНТ

*/
router.get("/statistic", authenticate, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { year, month } = req.body;

    const transactions = await Transaction.find({
      owner: _id,
      year: year,
      month: month,
    });

    const categoriesTransaction = amountByCategory(transactions);
    const totalIncome = amountByTransactionType(transactions, true);
    const totalExpence = amountByTransactionType(transactions, false);

    function amountByCategory(arr) {
      return arr.reduce(
        (acc, { category, amount }) => ({
          ...acc,
          [category]: acc[category]
            ? (acc[category] * 100 + amount * 100) / 100
            : amount,
        }),
        {}
      );
    }
    function amountByTransactionType(arr, type) {
      return arr.reduce(
        (acc, { amount, isIncome }) =>
          isIncome === type ? (acc * 100 + amount * 100) / 100 : acc,
        0
      );
    }

    const data = {
      category: { ...categoriesTransaction },
      total: { Expence: totalExpence, Income: totalIncome },
    };

    res.json(data);
  } catch (error) {
    next();
  }
});

module.exports = router;
