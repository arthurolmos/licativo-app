import { ErrorManager } from "../../error";
import { CreateOrderInput, UpdateOrderInput } from "../../interfaces";
import { Sale } from "../models";

export const SalesController = {
  async index() {
    try {
      return await Sale.index();
    } catch (err) {
      console.log("Error getting all SALES", err);
      throw new ErrorManager(err.message);
    }
  },

  async findById(id: string) {
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

  async create(data: CreateOrderInput) {
    try {
      const sale = new Sale(
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

      console.log({ sale });

      await sale.create();
    } catch (err) {
      console.log("Error creating SALE", err);
      throw new ErrorManager(err.message);
    }
  },

  async update(id: string, values: UpdateOrderInput) {
    try {
      const sale = await Sale.findById(id);
      await sale.update(values);
    } catch (err) {
      console.log("Error updating SALE", err);
      throw new ErrorManager(err.message);
    }
  },

  async delete(id: string) {
    try {
      const sale = await Sale.findById(id);
      await sale.delete();
    } catch (err) {
      console.log("Error deleting SALE", err);
      throw new ErrorManager(err.message);
    }
  },

  addObserver(cb: Function) {
    try {
      return Sale.addObserver(cb);
    } catch (err) {
      console.log("Error adding SALE observer", err);
      throw new ErrorManager(err.message);
    }
  },

  addMonthObserver(cb: Function) {
    try {
      return Sale.addMonthObserver(cb);
    } catch (err) {
      console.log("Error adding SALE month observer", err);
      throw new ErrorManager(err.message);
    }
  },

  addOpenSalesObserver(cb: Function) {
    try {
      return Sale.addOpenSalesObserver(cb);
    } catch (err) {
      console.log("Error adding open SALE observer", err);
      throw new ErrorManager(err.message);
    }
  },
};
