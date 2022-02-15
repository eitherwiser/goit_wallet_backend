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

module.exports = {
  amountByCategory,
};
