import { SaleRepository as repository } from "../repositories";

export class Sale {
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
    this.customer = name;
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
    toFirestore: function (sale) {
      return {
        customer: sale.customer,
        product: sale.product,
        quantity: sale.quantity,
        price: sale.price,
        orderDate: sale.orderDate,
        notes: sale.notes,
        isPaid: sale.isPaid,
        paymentDate: sale.paymentDate,
        isDelivered: sale.isDelivered,
        deliveryDate: sale.deliveryDate,
        type: sale.type,
        platform: sale.platform,
      };
    },

    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      data.id = snapshot.id;

      return new Sale({
        id: data.id,
        name: data.customer,
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
    return repository.getAllSales(Sale.converter);
  }

  static async findById(id) {
    return repository.findById(id, Sale.converter);
  }

  create() {
    return repository.create(this, Sale.converter);
  }

  update(values) {
    values.customer = values.name;
    return repository.update(this.id, values);
  }

  delete() {
    return repository.delete(this.id);
  }

  static addObserver(cb) {
    return repository.addObserver(cb, Sale.converter);
  }

  static addMonthObserver(cb) {
    return repository.addMonthObserver(cb, Sale.converter);
  }

  static addOpenSalesObserver(cb) {
    return repository.addOpenSalesObserver(cb, Sale.converter);
  }

  static getMonthSales() {
    return repository.getMonthSales(Sale.converter);
  }

  static getOpenSales() {
    return repository.getOpenSales(Sale.converter);
  }
}
