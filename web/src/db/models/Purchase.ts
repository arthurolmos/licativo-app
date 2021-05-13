import { PurchasesRepository as repository } from "../repositories";
import { UpdateOrderInput, UpdateSaleInput } from "../../interfaces";
import { priceStringToFloat } from "../../lib";

export class Purchase {
  constructor(
    readonly supplier: string,
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
    toFirestore: function (purchase: Purchase) {
      return {
        supplier: purchase.supplier,
        product: purchase.product,
        quantity: purchase.quantity,
        price: purchase.price,
        orderDate: purchase.orderDate,
        notes: purchase.notes,
        isPaid: purchase.isPaid,
        paymentDate: purchase.isPaid ? purchase.paymentDate : null,
        isDelivered: purchase.isDelivered,
        deliveryDate: purchase.isDelivered ? purchase.deliveryDate : null,
        type: purchase.type,
        platform: purchase.platform,
      };
    },

    fromFirestore: function (snapshot: any, options: any) {
      const data = snapshot.data(options);
      data.id = snapshot.id;

      return new Purchase(
        data.supplier,
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

  static async index(): Promise<Purchase[]> {
    return repository.getAllPurchases(Purchase.converter);
  }

  static async findById(id: string): Promise<Purchase> {
    return repository.findById(id, Purchase.converter);
  }

  create() {
    return repository.create(this, Purchase.converter);
  }

  update(values: any) {
    values.supplier = values.name;
    // return repository.update(this.id, values);
  }

  delete() {
    return repository.delete(this.id as string);
  }

  static addObserver(cb: Function) {
    return repository.addObserver(cb, Purchase.converter);
  }

  static addMonthObserver(cb: Function) {
    return repository.addMonthObserver(cb, Purchase.converter);
  }

  static addOpenPurchasesObserver(cb: Function) {
    return repository.addOpenPurchasesObserver(cb, Purchase.converter);
  }

  static getMonthPurchases(): Promise<Purchase[]> {
    return repository.getMonthPurchases(Purchase.converter);
  }

  static getOpenPurchases(): Promise<Purchase[]> {
    return repository.getOpenPurchases(Purchase.converter);
  }
}
