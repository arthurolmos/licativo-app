import { priceStringToFloat } from "../../src/lib";

const price = "R$ 10,99";

describe("#priceStringToFloat", () => {
  test("It should receive a string price with R$ prefix and a , separator and return a Float", () => {
    const fPrice = priceStringToFloat(price);

    expect(fPrice).toBe(10.99);
  });
});
