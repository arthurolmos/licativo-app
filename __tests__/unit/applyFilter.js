import { applyFilter } from "../../src/lib";

const orders = [
  {
    type: "sales",
    customer: "Arthur",
    platform: "Site",
    isPaid: true,
    isDelivered: true,
    orderDate: new Date(2021, 1, 1),
  },
  {
    type: "sales",
    customer: "Monara",
    platform: "Instagram",
    isPaid: true,
    isDelivered: true,
    orderDate: new Date(2021, 1, 10),
  },
  {
    type: "sales",
    customer: "Rodrigo",
    platform: "Instagram",
    isPaid: true,
    isDelivered: false,
    orderDate: new Date(2021, 1, 21),
  },
  {
    type: "sales",
    customer: "Rute",
    platform: "Site",
    isPaid: false,
    isDelivered: false,
    orderDate: new Date(2021, 1, 28),
  },
  {
    type: "sales",
    customer: "Antonio",
    platform: "Mercado Livre",
    isPaid: false,
    isDelivered: false,
    orderDate: new Date(2021, 2, 1),
  },
  {
    type: "sales",
    customer: "George",
    platform: "Mercado Livre",
    isPaid: false,
    isDelivered: false,
    orderDate: new Date(2021, 2, 10),
  },
];

describe("#applyFilter", () => {
  test("It should filter orders by name", () => {
    const resp = applyFilter({
      name: "Art",
      platform: "",
      isPaid: null,
      isDelivered: null,
      fromDate: null,
      toDate: null,
      orders: orders,
    });

    expect(resp.isFiltered).toBe(true);
    expect(resp.orders.length).toBe(1);
    expect(resp.orders).toContain(orders[0]);
  });

  test("It should filter orders by platform", () => {
    const resp = applyFilter({
      name: "",
      platform: "Instagram",
      isPaid: null,
      isDelivered: null,
      fromDate: null,
      toDate: null,
      orders: orders,
    });

    expect(resp.isFiltered).toBe(true);
    expect(resp.orders.length).toBe(2);
    expect(resp.orders).toContain(orders[1]);
    expect(resp.orders).toContain(orders[2]);
  });

  test("It should filter orders by isPaid", () => {
    const resp = applyFilter({
      name: "",
      platform: "",
      isPaid: true,
      isDelivered: null,
      fromDate: null,
      toDate: null,
      orders: orders,
    });

    expect(resp.isFiltered).toBe(true);
    expect(resp.orders.length).toBe(3);
    expect(resp.orders).toContain(orders[0]);
    expect(resp.orders).toContain(orders[1]);
    expect(resp.orders).toContain(orders[2]);
  });

  test("It should filter orders by isDelivered", () => {
    const resp = applyFilter({
      name: "",
      platform: "",
      isPaid: null,
      isDelivered: true,
      fromDate: null,
      toDate: null,
      orders: orders,
    });

    expect(resp.isFiltered).toBe(true);
    expect(resp.orders.length).toBe(2);
    expect(resp.orders).toContain(orders[0]);
    expect(resp.orders).toContain(orders[1]);
  });

  test("It should filter orders from Date", () => {
    const resp = applyFilter({
      name: "",
      platform: "",
      isPaid: null,
      isDelivered: null,
      fromDate: new Date(2021, 1, 10),
      toDate: null,
      orders: orders,
    });

    expect(resp.isFiltered).toBe(true);
    expect(resp.orders.length).toBe(5);
    expect(resp.orders).toContain(orders[1]);
    expect(resp.orders).toContain(orders[2]);
    expect(resp.orders).toContain(orders[3]);
    expect(resp.orders).toContain(orders[4]);
    expect(resp.orders).toContain(orders[5]);
  });

  test("It should filter orders to Date", () => {
    const resp = applyFilter({
      name: "",
      platform: "",
      isPaid: null,
      isDelivered: null,
      fromDate: null,
      toDate: new Date(2021, 1, 20),
      orders: orders,
    });

    expect(resp.isFiltered).toBe(true);
    expect(resp.orders.length).toBe(2);
    expect(resp.orders).toContain(orders[0]);
    expect(resp.orders).toContain(orders[1]);
  });

  test("It should filter orders from Date to Date", () => {
    const resp = applyFilter({
      name: "",
      platform: "",
      isPaid: null,
      isDelivered: null,
      fromDate: new Date(2021, 1, 10),
      toDate: new Date(2021, 2, 1),
      orders: orders,
    });

    expect(resp.isFiltered).toBe(true);
    expect(resp.orders.length).toBe(4);
    expect(resp.orders).toContain(orders[1]);
    expect(resp.orders).toContain(orders[2]);
    expect(resp.orders).toContain(orders[3]);
    expect(resp.orders).toContain(orders[4]);
  });

  test("It should filter orders by from Date to Date and platform", () => {
    const resp = applyFilter({
      name: "",
      platform: "Instagram",
      isPaid: null,
      isDelivered: null,
      fromDate: new Date(2021, 1, 10),
      toDate: new Date(2021, 2, 1),
      orders: orders,
    });

    expect(resp.isFiltered).toBe(true);
    expect(resp.orders.length).toBe(2);
    expect(resp.orders).toContain(orders[1]);
    expect(resp.orders).toContain(orders[2]);
  });
});
