const amountByTransactionType = (arr, type) => {
  return arr.reduce(
    (acc, { amount, isIncome }) =>
      isIncome === type ? (acc * 100 + amount * 100) / 100 : acc,
    0
  );
};

module.exports = {
  amountByTransactionType,
};
