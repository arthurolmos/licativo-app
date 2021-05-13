import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhrHRpag8gyzXZ4EbC1gLwTsN0KpCCS_4",
  authDomain: "controle-lojinha.firebaseapp.com",
  databaseURL: "https://controle-lojinha.firebaseio.com",
  projectId: "controle-lojinha",
  storageBucket: "controle-lojinha.appspot.com",
  messagingSenderId: "962642526498",
  appId: "1:962642526498:web:6cee6d84270ac3baec657b",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
