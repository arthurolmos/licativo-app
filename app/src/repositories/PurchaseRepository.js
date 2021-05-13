import dao from "../dao";
import { convertDateToFirebaseTime, getBaseRef } from "../lib";
import { getArrayFromSnapshot } from "../lib/db/getArrayFromSnapshot";
import { DateTime } from "luxon";

export const PurchaseRepository = {
  async getAllPurchases(converter) {
    const ref = getBaseRef()
      .collection("purchases")
      .orderBy("orderDate", "desc")
      .withConverter(converter);

    const purchases = await dao.getCollection(ref);
    return purchases;
  },

  async getMonthPurchases(converter) {
    const start = DateTime.local().startOf("month").toJSDate();
    const end = DateTime.local().endOf("month").toJSDate();

    const fStart = convertDateToFirebaseTime(start);
    const fEnd = convertDateToFirebaseTime(end);

    const ref = getBaseRef()
      .collection("purchases")
      .where("orderDate", ">=", fStart)
      .where("orderDate", "<=", fEnd)
      .withConverter(converter);

    const monthPurchases = await dao.getCollection(ref);
    return monthPurchases;
  },

  async getOpenPurchases(converter) {
    const ref = getBaseRef()
      .collection("purchases")
      .orderBy("orderDate", "asc")
      .where("isDelivered", "==", false)
      .withConverter(converter);

    const openPurchases = await dao.getCollection(ref);
    return openPurchases;
  },

  async findById(id, converter) {
    const ref = getBaseRef()
      .collection("purchases")
      .doc(id)
      .withConverter(converter);
    const purchase = await dao.getDocument(ref);

    return purchase;
  },

  async create(data, converter) {
    const ref = getBaseRef().collection("purchases").withConverter(converter);

    await dao.createDocument(ref, data);
  },

  async update(id, values) {
    console.log(id);
    const ref = getBaseRef().collection("purchases").doc(id);

    await dao.updateDocument(ref, values);
  },

  async delete(id) {
    const ref = getBaseRef().collection("purchases").doc(id);

    await dao.deleteDocument(ref);
  },

  addObserver(cb, converter) {
    const ref = getBaseRef()
      .collection("purchases")
      .orderBy("orderDate", "desc")
      .withConverter(converter);

    return ref.onSnapshot((snapshot) => {
      const purchases = getArrayFromSnapshot(snapshot);

      cb(purchases);
    });
  },

  addMonthObserver(cb, converter) {
    const start = DateTime.local().startOf("month").toJSDate();
    const end = DateTime.local().endOf("month").toJSDate();

    const fStart = convertDateToFirebaseTime(start);
    const fEnd = convertDateToFirebaseTime(end);

    const ref = getBaseRef()
      .collection("purchases")
      .where("orderDate", ">=", fStart)
      .where("orderDate", "<=", fEnd)
      .orderBy("orderDate", "desc")
      .withConverter(converter);

    return ref.onSnapshot((snapshot) => {
      const purchases = getArrayFromSnapshot(snapshot);

      cb(purchases);
    });
  },

  addOpenPurchasesObserver(cb, converter) {
    const ref = getBaseRef()
      .collection("purchases")
      .where("isDelivered", "==", false)
      .orderBy("orderDate", "desc")
      .withConverter(converter);

    return ref.onSnapshot((snapshot) => {
      const purchases = getArrayFromSnapshot(snapshot);

      cb(purchases);
    });
  },
};
