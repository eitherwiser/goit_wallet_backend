const amountByCategory = (arr) => {
  return arr.reduce(
    (acc, { categoryId, amount }) => ({
      ...acc,
      [categoryId]: acc[categoryId]
        ? (acc[categoryId] * 100 + amount * 100) / 100
        : amount,
    }),
    {}
  );
};

module.exports = {
  amountByCategory,
};
