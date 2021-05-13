import { SalesRepository as repository } from "../repositories";
import { UpdateOrderInput, UpdateSaleInput } from "../../interfaces";
import { priceStringToFloat } from "../../lib";

export class Sale {
  constructor(
    readonly customer: string,
    readonly product: string,
    readonly quantity: number,
    readonly price: number,
    readonly orderDate: Date,
    readonly notes: string,
    readonly type: string,
    readonly platform: string,
    readonly isPaid: boolean,
    readonly isDelivered: boolean,
    readonly id?: string | null,
    readonly paymentDate?: Date | null,
    readonly deliveryDate?: Date | null
  ) {}

  static converter = {
    toFirestore: function (sale: Sale) {
      return {
        customer: sale.customer,
        product: sale.product,
        quantity: sale.quantity,
        price: sale.price,
        orderDate: sale.orderDate,
        notes: sale.notes,
        isPaid: sale.isPaid,
        paymentDate: sale.isPaid ? sale.paymentDate : null,
        isDelivered: sale.isDelivered,
        deliveryDate: sale.isDelivered ? sale.deliveryDate : null,
        type: sale.type,
        platform: sale.platform,
      };
    },

    fromFirestore: function (snapshot: any, options: any) {
      const data = snapshot.data(options);
      data.id = snapshot.id;

      return new Sale(
        data.customer,
        data.product,
        data.quantity,
        data.price,
        data.orderDate.toDate(),
        data.notes,
        data.type,
        data.platform,
        data.isPaid,
        data.isDelivered,
        data.id,
        data.paymentDate ? data.paymentDate.toDate() : null,
        data.isDelivered ? data.deliveryDate.toDate() : null
      );
    },
  };

  static async index(): Promise<Sale[]> {
    return repository.getAllSales(Sale.converter);
  }

  static async findById(id: string): Promise<Sale> {
    return repository.findById(id, Sale.converter);
  }

  create() {
    return repository.create(this, Sale.converter);
  }

  update(values: UpdateOrderInput) {
    // const saleValues: UpdateSaleInput = {
    //   customer: values.name && values.name,
    //   product: values.product && values.product,
    //   quantity: values.quantity ? values.quantity : ,
    //   price: values.price ? priceStringToFloat(values.price) : "0",
    //   orderDate: values.orderDate ? new Date(values.orderDate) : undefined,
    //   notes: values.notes && values.notes,
    //   type: values.type && values.type,
    //   platform: values.platform && values.platform,
    //   isPaid: values.isPaid && values.isPaid,
    //   isDelivered: values.isDelivered && values.isDelivered,
    //   paymentDate: values.paymentDate
    //     ? new Date(values.paymentDate)
    //     : undefined,
    //   deliveryDate: values.deliveryDate
    //     ? new Date(values.deliveryDate)
    //     : undefined,
    // };
    // return repository.update(this.id, saleValues);
  }

  delete() {
    return repository.delete(this.id as string);
  }

  static addObserver(cb: Function) {
    return repository.addObserver(cb, Sale.converter);
  }

  static addMonthObserver(cb: Function) {
    return repository.addMonthObserver(cb, Sale.converter);
  }

  static addOpenSalesObserver(cb: Function) {
    return repository.addOpenSalesObserver(cb, Sale.converter);
  }

  static getMonthSales(): Promise<Sale[]> {
    return repository.getMonthSales(Sale.converter);
  }

  static getOpenSales(): Promise<Sale[]> {
    return repository.getOpenSales(Sale.converter);
  }
}
