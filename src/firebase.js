import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  // Your Firebase configuration object goes here
  apiKey: "AIzaSyCuUPEC-7WOQSq7enYyHCMPvD_ePt4oN0Q",
  authDomain: "carefinder-18537.firebaseapp.com",
  databaseURL: "https://carefinder-18537-default-rtdb.firebaseio.com",
  projectId: "carefinder-18537",
  storageBucket: "carefinder-18537.appspot.com",
  messagingSenderId: "665764269390",
  appId: "1:665764269390:web:a1c80551185abef6b4221f",
  measurementId: "G-37H529L275",
};

firebase.initializeApp(firebaseConfig);

export const googleAuthProvider = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  // You can customize additional provider settings if needed
  // ...
  return provider;
};

export const firestore = firebase.firestore();
export const auth = firebase.auth();
