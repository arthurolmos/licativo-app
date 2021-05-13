import { CreateOrderInput } from "../../interfaces";
import { priceStringToFloat } from "../conversors/priceStringToFloat";

export const orderValidations: {
  [key in keyof CreateOrderInput]?: (
    value: string
  ) => { resp: boolean; message: string };
} = {
  name: (name) => {
    let resp = true;
    let message = "";

    if (name === "") {
      message = "Obrigatório";
      resp = false;
    }

    return { resp, message };
  },

  product: (product) => {
    let resp = true;
    let message = "";

    if (product === "") {
      message = "Obrigatório";
      resp = false;
    }

    return { resp, message };
  },

  quantity: (quantity) => {
    let resp = true;
    let message = "";

    if (quantity === "") {
      message = "Obrigatório";
      resp = false;
    } else if (parseInt(quantity) <= 0) {
      message = "Valor deve ser maior que 0";
      resp = false;
    }

    return { resp, message };
  },

  price: (price) => {
    let resp = true;
    let message = "";

    if (price === "") {
      message = "Obrigatório";
      resp = false;
    } else if (priceStringToFloat(price) <= 0) {
      message = "Valor deve ser maior que 0";
      resp = false;
    }

    return { resp, message };
  },

  orderDate: (orderDate) => {
    let resp = true;
    let message = "";

    if (orderDate === "") {
      message = "Obrigatório";
      resp = false;
    }

    return { resp, message };
  },
};
