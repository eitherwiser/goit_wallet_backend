const getTransactionsWithName = (category, categoryIdName) => {
  const newArr = [];
  category.find((option) => {
    categoryIdName.map((a) => {
      if (option.categoryId === a[0]) {
        newArr.push({
          _id: option._id,
          amount: option.amount,
          isIncome: option.isIncome,
          categoryId: option.categoryId,
          date: option.date,
          balance: option.balance,
          comment: option.comment,
          owner: option.owner,
          name: a[1],
        });
      }
    });
  });
  return newArr;
};

module.exports = {
  getTransactionsWithName,
};
