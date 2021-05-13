import dao from "../dao";
import {
  convertDateToFirebaseTime,
  getBaseRef,
  getArrayFromSnapshot,
} from "../../lib";
import { DateTime } from "luxon";
import { UpdateSaleInput } from "../../interfaces";
import { Sale } from "../models";

export const SalesRepository = {
  async getAllSales(converter: any): Promise<Sale[]> {
    const ref = getBaseRef()
      .collection("sales")
      .orderBy("orderDate", "desc")
      .withConverter(converter);

    const sales = await dao.getCollection(ref);
    return sales;
  },

  async getMonthSales(converter: any): Promise<Sale[]> {
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

  async getOpenSales(converter: any): Promise<Sale[]> {
    const ref = getBaseRef()
      .collection("sales")
      .orderBy("orderDate", "asc")
      .where("isDelivered", "==", false)
      .withConverter(converter);

    const openSales = await dao.getCollection(ref);
    return openSales;
  },

  async findById(id: string, converter: any): Promise<Sale> {
    const ref = getBaseRef()
      .collection("sales")
      .doc(id)
      .withConverter(converter);
    const sale = await dao.getDocument(ref);

    return sale;
  },

  async create(data: Sale, converter: any) {
    const ref = getBaseRef().collection("sales").withConverter(converter);

    await dao.createDocument(ref, data);
  },

  async update(id: string, values: UpdateSaleInput) {
    console.log(id);
    const ref = getBaseRef().collection("sales").doc(id);

    await dao.updateDocument(ref, values);
  },

  async delete(id: string) {
    const ref = getBaseRef().collection("sales").doc(id);

    await dao.deleteDocument(ref);
  },

  addObserver(cb: Function, converter: any) {
    const ref = getBaseRef()
      .collection("sales")
      .orderBy("orderDate", "desc")
      .withConverter(converter);

    return ref.onSnapshot((snapshot: any) => {
      const sales = getArrayFromSnapshot(snapshot);

      cb(sales);
    });
  },

  addMonthObserver(cb: Function, converter: any) {
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

    console.log("REF", ref);

    return ref.onSnapshot((snapshot: any) => {
      const sales = getArrayFromSnapshot(snapshot);

      cb(sales);
    });
  },

  addOpenSalesObserver(cb: Function, converter: any) {
    const ref = getBaseRef()
      .collection("sales")
      .where("isDelivered", "==", false)
      .orderBy("orderDate", "desc")
      .withConverter(converter);

    console.log("REF", ref);

    return ref.onSnapshot((snapshot: any) => {
      const sales = getArrayFromSnapshot(snapshot);

      cb(sales);
    });
  },
};
