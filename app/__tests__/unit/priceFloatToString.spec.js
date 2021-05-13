import { priceFloatToString } from "../../src/lib";

const price = 10.99;

describe("#priceFloatToString", () => {
  test("It should receive a float value and return a String with R$ prefix", () => {
    const sPrice = priceFloatToString(price);

    expect(sPrice).toBe("R$ 10,99");
  });
});
