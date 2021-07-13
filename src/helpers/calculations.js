const taxCalculation = (value, category) => {
  let tax;
  switch (category) {
    case 0:
      tax = 0;
      break;
    case 1:
      tax = 0.06;
      break;
    case 2:
      tax = 0.13;
      break;
    default:
      tax = 0.24;
  }
  // calculate the total tax value
  const taxValue = Math.round(tax * value * 100) / 100;
  // calculate the value after tax
  const valueAfterTax = value - taxValue;
  const taxPercent = tax * 100;
  return { taxValue, valueAfterTax, taxPercent };
};

const discountCalculation = (value, discount) => {
  const discountValue =
    Math.round(value * discount * 0.01 * 100) / 100;
  const valueAfterDiscount = value - discountValue;
  return { discountValue, valueAfterDiscount };
};

module.exports = {
  taxCalculation,
  discountCalculation,
};
