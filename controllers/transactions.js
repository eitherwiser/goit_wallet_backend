const { BadRequest } = require("http-errors");
const { Transaction, User } = require("../models");
const { joiTransactionValidation } = require("../middlewares");
const {
  countTheBalance,
  getTransactionsWithName,
  addCategoryIdName,
} = require("../helpers");

const getAllTransactions = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { _id, balance, transactionCategories } = req.user;
    const skip = (page - 1) * limit;

    const transaction = await Transaction.find(
      { owner: _id },
      "-createdAt -updatedAt -year -month",
      { skip, limit: Number(limit) }
    );
    const categoryIdName = addCategoryIdName(transactionCategories);
    const TyransactionsWithName = getTransactionsWithName(
      transaction,
      categoryIdName
    );
    const data = {
      balance: balance,
      transactions: [...TyransactionsWithName],
    };

    res.json(data);
  } catch (error) {
    next();
  }
};

const createTransactions = async (req, res, next) => {
  try {
    const { error } = joiTransactionValidation.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const { _id, balance } = req.user;
    const { amount, isIncome } = req.body;
    const transactionBalance = countTheBalance(isIncome, balance, amount);
    const newTransaction = await Transaction.create({
      ...req.body,
      owner: _id,
      balance: transactionBalance,
    });

    await User.updateOne({ _id }, { balance: transactionBalance });

    res.status(201).json(newTransaction);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
};

module.exports = {
  getAllTransactions,
  createTransactions,
};
