function castNumberToTrType(amount, isIncome) {
  let number = amount;
  if (isIncome) {
    number = amount;
  } else number = -amount;
  return number;
}

module.exports = {
  castNumberToTrType,
};
