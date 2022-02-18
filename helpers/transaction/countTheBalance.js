const countTheBalance = (isIncome, balance, amount) => {
  return isIncome === true
    ? (balance * 100 + amount * 100) / 100
    : (balance * 100 - amount * 100) / 100;
};

module.exports = {
  countTheBalance,
};
