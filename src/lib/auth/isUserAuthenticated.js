import firebase from "firebase";

export function isUserAuthenticated() {
  const auth = firebase.auth();

  const user = auth.currentUser;

  return user ? user : null;
}
