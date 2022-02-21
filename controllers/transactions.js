const { BadRequest } = require("http-errors");
const { Transaction, User } = require("../models");
const { joiTransactionValidation } = require("../middlewares");
const { countTheBalance, castNumberToTrType } = require("../helpers");

const getAllTransactions = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { _id, balance } = req.user;
    const skip = (page - 1) * limit;

    const transaction = await Transaction.find(
      { owner: _id },
      "-createdAt -updatedAt -year -month",
      { skip, limit: Number(limit) }
    ).sort({ date: -1 });

    const data = {
      balance: balance,
      transactions: [...transaction],
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
    const { amount, isIncome, date } = req.body;
    const transactionBalance = countTheBalance(isIncome, balance, amount);

    const numberFromType = castNumberToTrType(amount, isIncome);

    const trMadeLater = await Transaction.updateMany(
      { $and: [{ owner: _id }, { date: { $gt: date } }] },
      { $inc: { balance: numberFromType } }
    );

    if (trMadeLater.matchedCount > 0) {
      const trAfterNew = await Transaction.findOne({
        $and: [{ owner: _id }, { date: { $gt: date } }],
      });

      const oldBalanc =
        trAfterNew.balance === undefined ? 0 : trAfterNew.balance;

      const quantityFromType =
        trAfterNew.amount === undefined || trAfterNew.isIncome === undefined
          ? 0
          : castNumberToTrType(trAfterNew.amount, trAfterNew.isIncome);

      const newOldTransaction = await Transaction.create({
        ...req.body,
        owner: _id,
        balance: oldBalanc - quantityFromType,
      });

      await User.updateOne({ _id }, { balance: transactionBalance });
      res.status(201).json(newOldTransaction);
    } else {
      const newTransaction = await Transaction.create({
        ...req.body,
        owner: _id,
        balance: transactionBalance,
      });

      await User.updateOne({ _id }, { balance: transactionBalance });
      res.status(201).json(newTransaction);
    }
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
