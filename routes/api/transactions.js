const express = require("express");
const { BadRequest } = require("http-errors");
const router = express.Router();

const { Transaction, User } = require("../../models");
const { joiTransactionValidation, authenticate } = require("../../middlewares");

const { countTheBalance } = require("../../helpers/index");

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

module.exports = router;
