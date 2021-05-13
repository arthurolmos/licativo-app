import { PurchaseRepository as repository } from "../repositories";

export class Purchase {
  constructor({
    id,
    name,
    product,
    quantity,
    price,
    orderDate,
    notes,
    isPaid = false,
    paymentDate = null,
    isDelivered = false,
    deliveryDate = null,
    type,
    platform,
  }) {
    this.id = id;
    this.supplier = name;
    this.product = product;
    this.quantity = quantity;
    this.price = price;
    this.orderDate = orderDate;
    this.notes = notes;
    this.isPaid = isPaid;
    this.paymentDate = paymentDate;
    this.isDelivered = isDelivered;
    this.deliveryDate = deliveryDate;
    this.type = type;
    this.platform = platform;
  }

  static converter = {
    toFirestore: function (purchase) {
      return {
        supplier: purchase.supplier,
        product: purchase.product,
        quantity: purchase.quantity,
        price: purchase.price,
        orderDate: purchase.orderDate,
        notes: purchase.notes,
        isPaid: purchase.isPaid,
        paymentDate: purchase.paymentDate,
        isDelivered: purchase.isDelivered,
        deliveryDate: purchase.deliveryDate,
        type: purchase.type,
        platform: purchase.platform,
      };
    },

    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      data.id = snapshot.id;

      return new Purchase({
        id: data.id,
        name: data.supplier,
        product: data.product,
        quantity: data.quantity,
        price: data.price,
        orderDate: data.orderDate.toDate(),
        notes: data.notes,
        isPaid: data.isPaid,
        paymentDate: data.paymentDate ? data.paymentDate.toDate() : new Date(),
        isDelivered: data.isDelivered,
        deliveryDate: data.isDelivered
          ? data.deliveryDate.toDate()
          : new Date(),
        type: data.type,
        platform: data.platform,
      });
    },
  };

  static async index() {
    return repository.getAllPurchases(Purchase.converter);
  }

  static async findById(id) {
    return repository.findById(id, Purchase.converter);
  }

  create() {
    return repository.create(this, Purchase.converter);
  }

  update(values) {
    values.supplier = values.name;
    return repository.update(this.id, values);
  }

  delete() {
    return repository.delete(this.id);
  }

  static addObserver(cb) {
    return repository.addObserver(cb, Purchase.converter);
  }

  static addMonthObserver(cb) {
    return repository.addMonthObserver(cb, Purchase.converter);
  }

  static addOpenPurchasesObserver(cb) {
    return repository.addOpenPurchasesObserver(cb, Purchase.converter);
  }

  static getMonthPurchases() {
    return repository.getMonthPurchases(Purchase.converter);
  }

  static getOpenPurchases() {
    return repository.getOpenPurchases(Purchase.converter);
  }
}
