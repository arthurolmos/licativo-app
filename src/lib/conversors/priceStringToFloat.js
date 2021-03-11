export function priceStringToFloat(price) {
  const fPrice = price.replace("R$", "").replace(".", "").replace(",", ".");

  return parseFloat(fPrice);
}
