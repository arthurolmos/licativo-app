export function calcTotalPrice(list) {
  const total = list.reduce((accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue.price);
  }, 0);

  return total;
}
