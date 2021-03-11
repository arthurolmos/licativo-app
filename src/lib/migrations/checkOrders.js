import firebase from "firebase";

export default async function checkOrders() {
  const pRef = firebase.firestore().collection("purchases");
  const sRef = firebase.firestore().collection("sales");

  const pURef = firebase
    .firestore()
    .collection("users")
    .doc("sTbGP109heZulLOXGLiWcDAdMmj1")
    .collection("purchases");
  const sURef = firebase
    .firestore()
    .collection("users")
    .doc("sTbGP109heZulLOXGLiWcDAdMmj1")
    .collection("sales");

  const sales = await dao.getCollection(sRef);
  const purchases = await dao.getCollection(pRef);

  const usersales = await dao.getCollection(sURef);
  const userpurchases = await dao.getCollection(pURef);

  console.log("SALES", sales.length);
  console.log("PURCHASES", purchases.length);
  console.log("USER SALES", usersales.length);
  console.log("USER PURCHASES", userpurchases.length);
}
