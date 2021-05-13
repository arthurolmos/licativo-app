import { ErrorManager } from "../error";
import { Purchase } from "../models";

export const PurchaseController = {
  async index() {
    try {
      return await Purchase.index();
    } catch (err) {
      console.log("Error getting all PURCHASES", err);
      throw new ErrorManager(err.message);
    }
  },

  async findById(id) {
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

  async create(data) {
    try {
      const purchase = new Purchase(data);
      await purchase.create(data);
    } catch (err) {
      console.log("Error creating PURCHASE", err);
      throw new ErrorManager(err.message);
    }
  },

  async update(id, values) {
    try {
      const purchase = await Purchase.findById(id);
      await purchase.update(values);
    } catch (err) {
      console.log("Error updating PURCHASE", err);
      throw new ErrorManager(err.message);
    }
  },

  async delete(id) {
    try {
      const purchase = await Purchase.findById(id);
      await purchase.delete();
    } catch (err) {
      console.log("Error deleting PURCHASE", err);
      throw new ErrorManager(err.message);
    }
  },

  addObserver(cb) {
    try {
      return Purchase.addObserver(cb);
    } catch (err) {
      console.log("Error adding PURCHASE observer", err);
      throw new ErrorManager(err.message);
    }
  },

  addMonthObserver(cb) {
    try {
      return Purchase.addMonthObserver(cb);
    } catch (err) {
      console.log("Error adding PURCHASE month observer", err);
      throw new ErrorManager(err.message);
    }
  },

  addOpenPurchasesObserver(cb) {
    try {
      return Purchase.addOpenPurchasesObserver(cb);
    } catch (err) {
      console.log("Error adding open PURCHASE observer", err);
      throw new ErrorManager(err.message);
    }
  },
};
