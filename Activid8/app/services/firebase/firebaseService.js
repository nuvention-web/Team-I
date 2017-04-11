const keys = require("./firebaseKeys.js");
import * as firebase from "firebase";

// Initialize default app
// Retrieve your own options values by adding a web app on
// https://console.firebase.google.com

const firebaseConfig = {
  apiKey: keys.apiKey, // Auth / General Use
  authDomain: keys.authDomain, // Auth with popup/redirect
  databaseURL: keys.databaseURL, // Realtime Database
  storageBucket: keys.storageBucket, // Storage
  messagingSenderId: "123456789"       // Cloud Messaging
};

const fb = firebase.initializeApp(firebaseConfig);

function firebaseApp(){
  return fb;
};


module.exports = firebaseApp;
