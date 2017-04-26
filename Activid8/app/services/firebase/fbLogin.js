import * as firebase from "firebase";
import {Actions} from "react-native-router-flux";
import getUserID from "../facebook/getUserID";
import getFirebaseSelf from "./getFirebaseSelf";

const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

export default function fbLogin (access_token) {// Build Firebase credential with the Facebook access token.
  var credential = firebase.auth.FacebookAuthProvider.credential(access_token);
  var userRef;
  var userID;
  // Sign in with credential from the Google user.
  firebase.auth().signInWithCredential(credential).then(
    function(){
      console.log("Firebase Signed In Successfully");
      getFirebaseSelf().then((userObj)=>{
        Actions.main({
          FBAccessToken: access_token,
          userObj: userObj
        });
      },(err)=>{
        console.log(err);
      });
    },
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
    }
  );
};
