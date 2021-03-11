import firebase from "firebase";

export function convertDateToFirebaseTime(date) {
  return firebase.firestore.Timestamp.fromDate(date);
}
