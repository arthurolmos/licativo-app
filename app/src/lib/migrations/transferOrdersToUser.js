import firebase from "firebase";
import dao from "../dao";

export default async function transferOrdersToUser(uid, collection) {
  try {
    const ref = firebase.firestore().collection(collection);

    const orders = await dao.getCollection(ref);

    console.log("orders", orders);

    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection(collection);
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];

      if (collection === "sales") {
        order.customer = order.to;
        delete order.to;
      } else {
        order.supplier = order.from;
        delete order.from;
      }

      if (order.isPaid) order.paymentDate = new Date();
      if (order.isDelivered) order.deliveryDate = new Date();

      dao.createDocument(userRef, order);
    }
  } catch (err) {
    console.log(err);
  }
}
