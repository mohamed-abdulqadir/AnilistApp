import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDD4q1hYdnUxXvNbrfXQ6sqlxY8PINFHyw",
  authDomain: "anilist-users.firebaseapp.com",
  projectId: "anilist-users",
  storageBucket: "anilist-users.appspot.com",
  messagingSenderId: "15098756698",
  appId: "1:15098756698:web:d2bbcda1222323d4782263",
});

const db = firebaseApp.firestore();

export default db;
