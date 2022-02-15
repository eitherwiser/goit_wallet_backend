const express = require("express");
const { BadRequest } = require("http-errors");
const router = express.Router();

const { Transaction, User } = require("../../models");
const {
  joiTransactionValidation,
  joiTransactionStatisticValidation,
  authenticate,
} = require("../../middlewares");
const {
  amountByCategory,
  amountByTransactionType,
  countTheBalance,
} = require("../../helpers/index");

/* 
1. Получение всех транзакций пользователя.
2. Создание транзакции.
3. Получение статистики транзакций по месяцу и году. 
*/

/*энд-поинт получение всех транзакций пользователя.*/
router.get("/", authenticate, async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const { _id } = req.user;
    const skip = (page - 1) * limit;

    const transaction = await Transaction.find(
      { owner: _id },
      "-createdAt -updatedAt",
      { skip, limit: Number(limit) }
    );

    res.json(transaction);
  } catch (error) {
    next();
  }
});

/* энд-поинт создания транзакции*/
router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = joiTransactionValidation.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const { _id, balance } = req.user;
    const { amount, isIncome } = req.body;
    /*
    // Проверка на наличее средств на балансе у пользователя
    if ((amount > balance) & (isIncome === false)) {
      throw new BadRequest("Insufficient funds");
    }
    */
    const transactionBalance = countTheBalance(isIncome, balance, amount);

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

/* энд-поинт на получение подробной статистики 
за месяц и год по транзакциям пользователя*/
router.get("/statistic", authenticate, async (req, res, next) => {
  try {
    const { error } = joiTransactionStatisticValidation.validate(req.body);
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

    const categoriesTransaction = amountByCategory(transactions);
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
