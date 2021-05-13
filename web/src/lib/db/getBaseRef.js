import firebase from "firebase";
import { isUserAuthenticated } from "../auth/isUserAuthenticated";

export function getBaseRef() {
  const db = firebase.firestore();

  const user = isUserAuthenticated();

  return user ? db.collection("users").doc(user.uid) : db;
}
