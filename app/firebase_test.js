import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApRtBBGJHB3O7H5Foevv744bg3V2Ds41w",
  authDomain: "licativo-test.firebaseapp.com",
  projectId: "licativo-test",
  storageBucket: "licativo-test.appspot.com",
  messagingSenderId: "121949978968",
  appId: "1:121949978968:web:d17281df148f1dacd6e52d",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
