import { ErrorManager } from "../error";
import { Sale } from "../models";

export const SaleController = {
  async index() {
    try {
      return await Sale.index();
    } catch (err) {
      console.log("Error getting all SALES", err);
      throw new ErrorManager(err.message);
    }
  },

  async findById(id) {
    try {
      return await Sale.findById(id);
    } catch (err) {
      console.log("Error getting SALE document", err);
      throw new ErrorManager(err.message);
    }
  },

  async getMonthSales() {
    try {
      return await Sale.getMonthSales();
    } catch (err) {
      console.log("Error getting month SALES", err);
      throw new ErrorManager(err.message);
    }
  },

  async getOpenSales() {
    try {
      return await Sale.getOpenSales();
    } catch (err) {
      console.log("Error getting open SALES", err);
      throw new ErrorManager(err.message);
    }
  },

  async create(data) {
    try {
      const sale = new Sale(data);
      await sale.create(data);
    } catch (err) {
      console.log("Error creating SALE", err);
      throw new ErrorManager(err.message);
    }
  },

  async update(id, values) {
    try {
      const sale = await Sale.findById(id);
      await sale.update(values);
    } catch (err) {
      console.log("Error updating SALE", err);
      throw new ErrorManager(err.message);
    }
  },

  async delete(id) {
    try {
      const sale = await Sale.findById(id);
      await sale.delete();
    } catch (err) {
      console.log("Error deleting SALE", err);
      throw new ErrorManager(err.message);
    }
  },

  addObserver(cb) {
    try {
      return Sale.addObserver(cb);
    } catch (err) {
      console.log("Error adding SALE observer", err);
      throw new ErrorManager(err.message);
    }
  },

  addMonthObserver(cb) {
    try {
      return Sale.addMonthObserver(cb);
    } catch (err) {
      console.log("Error adding SALE month observer", err);
      throw new ErrorManager(err.message);
    }
  },

  addOpenSalesObserver(cb) {
    try {
      return Sale.addOpenSalesObserver(cb);
    } catch (err) {
      console.log("Error adding open SALE observer", err);
      throw new ErrorManager(err.message);
    }
  },
};
