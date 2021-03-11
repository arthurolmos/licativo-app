import { calcTotalPrice } from "../../src/lib";

const orders = [
  { price: 10.99 },
  { price: 11.0 },
  { price: 12.0 },
  { price: 13.0 },
  { price: 14.0 },
  { price: 15.0 },
];

describe("#calcTotalPrice", () => {
  test("It should sum all order's price and return the total", () => {
    const totalPrice = calcTotalPrice(orders);

    expect(totalPrice).toBeCloseTo(75.99);
  });
});
