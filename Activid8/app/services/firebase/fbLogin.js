import * as firebase from "firebase";
<<<<<<< Updated upstream
=======
import {Actions} from "react-native-router-flux";
>>>>>>> Stashed changes

export default function fbLogin (access_token) {
  // Build Firebase credential with the Facebook access token.
  var credential = firebase.auth.FacebookAuthProvider.credential(access_token);

  // Sign in with credential from the Google user.
<<<<<<< Updated upstream
  firebase.auth().signInWithCredential(credential).catch(function(error) {
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
=======
  firebase.auth().signInWithCredential(credential).then(
    function(){
      console.log("Firebase Signed In Successfully");
      Actions.main({FBAccessToken: access_token});},
    function(error) {
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
>>>>>>> Stashed changes
}
