import dao from "../dao";
import {
  convertDateToFirebaseTime,
  getBaseRef,
  getArrayFromSnapshot,
} from "../../lib";
import { DateTime } from "luxon";
import { Purchase } from "../models";
import { UpdatePurchaseInput } from "../../interfaces";

export const PurchasesRepository = {
  async getAllPurchases(converter: any): Promise<Purchase[]> {
    const ref = getBaseRef()
      .collection("purchases")
      .orderBy("orderDate", "desc")
      .withConverter(converter);

    const purchases = await dao.getCollection(ref);
    return purchases;
  },

  async getMonthPurchases(converter: any): Promise<Purchase[]> {
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

  async getOpenPurchases(converter: any): Promise<Purchase[]> {
    const ref = getBaseRef()
      .collection("purchases")
      .orderBy("orderDate", "asc")
      .where("isDelivered", "==", false)
      .withConverter(converter);

    const openPurchases = await dao.getCollection(ref);
    return openPurchases;
  },

  async findById(id: string, converter: any): Promise<Purchase> {
    const ref = getBaseRef()
      .collection("purchases")
      .doc(id)
      .withConverter(converter);
    const purchase = await dao.getDocument(ref);

    return purchase;
  },

  async create(data: Purchase, converter: any) {
    const ref = getBaseRef().collection("purchases").withConverter(converter);

    await dao.createDocument(ref, data);
  },

  async update(id: string, values: UpdatePurchaseInput) {
    console.log(id);
    const ref = getBaseRef().collection("purchases").doc(id);

    await dao.updateDocument(ref, values);
  },

  async delete(id: string) {
    const ref = getBaseRef().collection("purchases").doc(id);

    await dao.deleteDocument(ref);
  },

  addObserver(cb: Function, converter: any) {
    const ref = getBaseRef()
      .collection("purchases")
      .orderBy("orderDate", "desc")
      .withConverter(converter);

    return ref.onSnapshot((snapshot: any) => {
      const purchases = getArrayFromSnapshot(snapshot);

      cb(purchases);
    });
  },

  addMonthObserver(cb: Function, converter: any) {
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

    return ref.onSnapshot((snapshot: any) => {
      const purchases = getArrayFromSnapshot(snapshot);

      cb(purchases);
    });
  },

  addOpenPurchasesObserver(cb: Function, converter: any) {
    const ref = getBaseRef()
      .collection("purchases")
      .where("isDelivered", "==", false)
      .orderBy("orderDate", "desc")
      .withConverter(converter);

    return ref.onSnapshot((snapshot: any) => {
      const purchases = getArrayFromSnapshot(snapshot);

      cb(purchases);
    });
  },
};
