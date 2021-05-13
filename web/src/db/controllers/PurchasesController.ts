import { ErrorManager } from "../../error";
import { Purchase } from "../models";
import { CreateOrderInput, UpdateOrderInput } from "../../interfaces";
import { convertDateToFirebaseTime, priceStringToFloat } from "../../lib";
import { DateTime } from "luxon";

export const PurchasesController = {
  async index() {
    try {
      return await Purchase.index();
    } catch (err) {
      console.log("Error getting all PURCHASES", err);
      throw new ErrorManager(err.message);
    }
  },

  async findById(id: string) {
    try {
      return await Purchase.findById(id);
    } catch (err) {
      console.log("Error getting PURCHASE document", err);
      throw new ErrorManager(err.message);
    }
  },

  async getMonthPurchases() {
    try {
      return await Purchase.getMonthPurchases();
    } catch (err) {
      console.log("Error getting month PURCHASES", err);
      throw new ErrorManager(err.message);
    }
  },

  async getOpenPurchases() {
    try {
      return await Purchase.getOpenPurchases();
    } catch (err) {
      console.log("Error getting open PURCHASES", err);
      throw new ErrorManager(err.message);
    }
  },

  async create(data: CreateOrderInput) {
    try {
      const purchase = new Purchase(
        data.name,
        data.product,
        data.quantity,
        data.price,
        data.orderDate,
        data.notes,
        data.type,
        data.platform,
        data.isPaid,
        data.isDelivered,
        null,
        data.paymentDate,
        data.deliveryDate
      );

      await purchase.create();
    } catch (err) {
      console.log("Error creating PURCHASE", err);
      throw new ErrorManager(err.message);
    }
  },

  async update(id: string, values: UpdateOrderInput) {
    try {
      const purchase = await Purchase.findById(id);
      await purchase.update(values);
    } catch (err) {
      console.log("Error updating PURCHASE", err);
      throw new ErrorManager(err.message);
    }
  },

  async delete(id: string) {
    try {
      const purchase = await Purchase.findById(id);
      await purchase.delete();
    } catch (err) {
      console.log("Error deleting PURCHASE", err);
      throw new ErrorManager(err.message);
    }
  },

  addObserver(cb: Function) {
    try {
      return Purchase.addObserver(cb);
    } catch (err) {
      console.log("Error adding PURCHASE observer", err);
      throw new ErrorManager(err.message);
    }
  },

  addMonthObserver(cb: Function) {
    try {
      return Purchase.addMonthObserver(cb);
    } catch (err) {
      console.log("Error adding PURCHASE month observer", err);
      throw new ErrorManager(err.message);
    }
  },

  addOpenPurchasesObserver(cb: Function) {
    try {
      return Purchase.addOpenPurchasesObserver(cb);
    } catch (err) {
      console.log("Error adding open PURCHASE observer", err);
      throw new ErrorManager(err.message);
    }
  },
};
