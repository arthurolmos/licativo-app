export function priceFloatToString(price) {
  const fPrice = price.toFixed(2).replace(".", ",");

  return "R$ " + fPrice;
}
