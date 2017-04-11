import * as firebase from "firebase";
import {Actions} from "react-native-router-flux";

export default function fbLogout () {
  // Build Firebase credential with the Facebook access token.
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
    console.log("Firebase Logged Out Successfully");
    // Actions.launch; // bring back to launch screen
    Actions.launch();
  }, function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(error);
    // ...
  });
}
