const addCategoryIdName = (obj) => {
  const newArr = [];
  obj.map(({ id, name }) => {
    newArr.push([id, name]);
  });
  return newArr;
};
module.exports = {
  addCategoryIdName,
};
