export function convertTimestampsToDates(order) {
  order.orderDate = order.orderDate.toDate();

  order.paymentDate = order.paymentDate
    ? order.paymentDate.toDate()
    : new Date();

  order.deliveryDate = order.deliveryDate
    ? order.deliveryDate.toDate()
    : new Date();

  return order;
}
