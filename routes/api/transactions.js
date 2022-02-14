const express = require("express");
const { NotFound, BadRequest } = require("http-errors");
const router = express.Router();

const { Transaction } = require("../../models");
const { joiTransactionValidation, authenticate } = require("../../middlewares");

/* 
1. Получение всех транзакций пользователя.
2. Создание транзакции.
3. Получение статистики транзакций по месяцу и/или году. 
*/

//Получение всех транзакций пользователя.
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

//Реализовать энд-поинт создания транзакции
router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = joiTransactionValidation.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { _id } = req.user;
    const newTransaction = await Transaction.create({
      ...req.body,
      owner: _id,
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
