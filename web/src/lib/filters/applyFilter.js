export function applyFilter({
  name,
  platform,
  isPaid,
  isDelivered,
  fromDate,
  toDate,
  orders,
}) {
  if (
    name !== "" ||
    isPaid !== null ||
    isDelivered !== null ||
    fromDate !== null ||
    toDate !== null ||
    platform !== ""
  ) {
    let filtered = orders;

    if (name !== "") {
      filtered = filtered.filter((item) => {
        const iName =
          item.type === "sales"
            ? item.customer.toLowerCase()
            : item.supplier.toLowerCase();

        return iName.includes(name.toLowerCase());
      });
    }

    if (platform !== "") {
      filtered = filtered.filter((item) => {
        const iPlatform = item.platform ? item.platform : ""; //TODO: ARRUMAR

        return iPlatform.toLowerCase().includes(platform.toLowerCase());
      });
    }

    if (isPaid !== null) {
      filtered = filtered.filter((item) => item.isPaid === isPaid);
    }

    if (isDelivered !== null) {
      filtered = filtered.filter((item) => item.isDelivered === isDelivered);
    }

    if (fromDate !== null) {
      filtered = filtered.filter((item) => {
        return item.orderDate >= fromDate;
      });
    }

    if (toDate !== null) {
      filtered = filtered.filter((item) => {
        return item.orderDate <= toDate;
      });
    }
    return { orders: [...filtered], isFiltered: true };
  }
  return { orders: orders, isFiltered: false };
}
