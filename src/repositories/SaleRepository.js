import dao from "../dao";
import { convertDateToFirebaseTime, getBaseRef } from "../lib";
import { getArrayFromSnapshot } from "../lib/db/getArrayFromSnapshot";
import { DateTime } from "luxon";

export const SaleRepository = {
  async getAllSales(converter) {
    const ref = getBaseRef()
      .collection("sales")
      .orderBy("orderDate", "desc")
      .withConverter(converter);

    const sales = await dao.getCollection(ref);
    return sales;
  },

  async getMonthSales(converter) {
    const start = DateTime.local().startOf("month").toJSDate();
    const end = DateTime.local().endOf("month").toJSDate();

    const fStart = convertDateToFirebaseTime(start);
    const fEnd = convertDateToFirebaseTime(end);

    const ref = getBaseRef()
      .collection("sales")
      .where("orderDate", ">=", fStart)
      .where("orderDate", "<=", fEnd)
      .withConverter(converter);

    const monthSales = await dao.getCollection(ref);
    return monthSales;
  },

  async getOpenSales(converter) {
    const ref = getBaseRef()
      .collection("sales")
      .orderBy("orderDate", "asc")
      .where("isDelivered", "==", false)
      .withConverter(converter);

    const openSales = await dao.getCollection(ref);
    return openSales;
  },

  async findById(id, converter) {
    const ref = getBaseRef()
      .collection("sales")
      .doc(id)
      .withConverter(converter);
    const sale = await dao.getDocument(ref);

    return sale;
  },

  async create(data, converter) {
    const ref = getBaseRef().collection("sales").withConverter(converter);

    await dao.createDocument(ref, data);
  },

  async update(id, values) {
    console.log(id);
    const ref = getBaseRef().collection("sales").doc(id);

    await dao.updateDocument(ref, values);
  },

  async delete(id) {
    const ref = getBaseRef().collection("sales").doc(id);

    await dao.deleteDocument(ref);
  },

  addObserver(cb, converter) {
    const ref = getBaseRef()
      .collection("sales")
      .orderBy("orderDate", "desc")
      .withConverter(converter);

    return ref.onSnapshot((snapshot) => {
      const sales = getArrayFromSnapshot(snapshot);

      cb(sales);
    });
  },

  addMonthObserver(cb, converter) {
    const start = DateTime.local().startOf("month").toJSDate();
    const end = DateTime.local().endOf("month").toJSDate();

    const fStart = convertDateToFirebaseTime(start);
    const fEnd = convertDateToFirebaseTime(end);

    const ref = getBaseRef()
      .collection("sales")
      .where("orderDate", ">=", fStart)
      .where("orderDate", "<=", fEnd)
      .orderBy("orderDate", "desc")
      .withConverter(converter);

    return ref.onSnapshot((snapshot) => {
      const sales = getArrayFromSnapshot(snapshot);

      cb(sales);
    });
  },

  addOpenSalesObserver(cb, converter) {
    const ref = getBaseRef()
      .collection("sales")
      .where("isDelivered", "==", false)
      .orderBy("orderDate", "desc")
      .withConverter(converter);

    return ref.onSnapshot((snapshot) => {
      const sales = getArrayFromSnapshot(snapshot);

      cb(sales);
    });
  },
};
