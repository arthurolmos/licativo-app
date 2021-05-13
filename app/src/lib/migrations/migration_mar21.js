import firebase from "firebase";
import dao from "../dao";

/* 
  Updates made on DB:
    - SALES: "client" name changed to "customer"
    - SALES: "qty" name changed to "quantity"
    - PURCHASES: "qty" name changed to "quantity"
    - Platform field Added
*/
export async function migration_mar21(userId) {
  async function createBackup(userId, collection) {
    try {
      const ref = firebase
        .firestore()
        .collection("users")
        .doc(userId) //User Id
        .collection(collection);
      const orders = await dao.getCollection(ref);

      console.log(collection, orders);

      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];

        const id = order.id;
        delete order.id;

        const backup = `${collection}_backup`;
        console.log("BACKUP", backup);

        const ref = firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .collection(backup)
          .doc(id);

        dao.setDocumentWithId(ref, order);

        console.log("DOC " + id + ` ADDED TO ${collection}_BACKUP!`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function migrateSales(userId) {
    try {
      const ref = firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("sales");
      const orders = await dao.getCollection(ref);

      console.log("sales", orders);

      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];

        console.log("S Order ID: ", order.id);

        const id = order.id;
        delete order.id;

        order.customer = order.client;
        delete order.client;

        order.quantity = order.qty;
        delete order.qty;
        if (!order.platform) order.platform = "Instagram";

        const ref = firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .collection("sales")
          .doc(id);

        dao.setDocumentWithId(ref, order);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function migratePurchases(userId) {
    try {
      const ref = firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("purchases");
      const orders = await dao.getCollection(ref);

      console.log("purchases", orders);

      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];

        console.log("P Order ID: ", order.id);

        const id = order.id;
        delete order.id;

        order.quantity = order.qty;
        delete order.qty;
        if (!order.platform) order.platform = "AliExpress";

        const ref = firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .collection("purchases")
          .doc(id);

        dao.setDocumentWithId(ref, order);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function compareCollections(userId, collection) {
    const ref = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection(collection);

    const orders = await dao.getCollection(ref);

    const backup = `${collection}_backup`;
    console.log("BACKUP", backup);

    const bkp_ref = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection(backup);

    const backup_orders = await dao.getCollection(bkp_ref);

    console.log(collection + " ORDERS LENGTH:", orders.length);
    console.log(backup + " ORDERS LENGTH:", backup_orders.length);

    if (orders.length === backup_orders.length) {
      console.log("OK!");
      return true;
    } else {
      console.log("FALSE!");
      return false;
    }
  }

  /** UNCOMMENT CAREFULLY **/

  // await createBackup(userId, "sales");
  // await createBackup(userId, "purchases");

  const compareSales = await compareCollections(userId, "sales");
  const comparePurchases = await compareCollections(userId, "purchases");

  if (compareSales && comparePurchases) {
    console.log("HELLO");

    // await migrateSales(userId);
    // await migratePurchases(userId);
  }
}
