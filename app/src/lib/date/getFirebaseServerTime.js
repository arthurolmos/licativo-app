import firebase from "firebase";

export function getFirebaseServerTime() {
  return firebase.firestore.FieldValue.serverTimestamp();
}
