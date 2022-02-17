function addAmountToCategoryObj(categories, obj) {
  const arrCategory = [];
  const arrOption = Object.entries(obj);

  categories.find((category) => {
    arrOption.map((option) => {
      if (category.id === option[0]) {
        category.total = option[1];
        arrCategory.push(category);
      }
    });
  });
  return arrCategory;
}

module.exports = {
  addAmountToCategoryObj,
};
