// app/components/button.common.js

const keys = require("../../firebaseKeys.js");
import * as firebase from "firebase";
console.log(firebaseApp);

// Initialize default app
// Retrieve your own options values by adding a web app on
// https://console.firebase.google.com

// Initialize Firebase
const firebaseConfig = {
  apiKey: keys.apiKey, // Auth / General Use
  authDomain: "<your-auth-domain>", // Auth with popup/redirect
  databaseURL: keys.databaseURL, // Realtime Database
  storageBucket: "<your-storage-bucket>", // Storage
  messagingSenderId: "123456789"                  // Cloud Messaging
};
const firebaseApp = firebase.initializeApp(firebaseConfig);


export default {
  getInitialState() {
    return {
      pressed: false
    };
  },

  handlePress() {
    this.setState({pressed: !this.state.pressed});
    //firebaseApp send item to App
    var db = firebaseApp.database();
    var ref = db.ref("test");
    var t = Math.round(new Date().getTime()/1000);
    var tmp = {};
    tmp[t] = 1;
    ref.update(tmp);
  }
};
