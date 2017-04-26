import * as firebase from "firebase";
import {Actions} from "react-native-router-flux";
import getUserID from "../facebook/getUserID";
<<<<<<< HEAD
const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

function _responseInfoCallback(error: ?Object, result: ?Object) {
  if (error) {
    alert('Error fetching data: ' + error.toString());
  } else {
    /*
      Actions.myProfile({
        MainPicture: result.picture.data.url,
        Name: result.name,
      })
      */
      getUserID().then((userID)=>{
        this.userID = userID;
        userRef = firebase.database().ref("Users/" + userID);
        userRef.set({
          name: result.name,
          picture: result.picture.data.url,
        });
      })

  }
};
=======
import getFirebaseSelf from "./getFirebaseSelf";
>>>>>>> refs/remotes/origin/master

export default function fbLogin (access_token) {// Build Firebase credential with the Facebook access token.
  var credential = firebase.auth.FacebookAuthProvider.credential(access_token);
  var userRef;
  var userID;
  // Sign in with credential from the Google user.
  firebase.auth().signInWithCredential(credential).then(
    function(){
      console.log("Firebase Signed In Successfully");
<<<<<<< HEAD
      //Actions.main({});

      const infoRequest = new GraphRequest(
        '/me',
        {
          httpMethod: 'GET',
          version: 'v2.5',
          parameters: {
            'fields': {
              'string' : 'name,friends,picture,photos'
            }
          }
        },
        _responseInfoCallback,
      );
            
      new GraphRequestManager().addRequest(infoRequest).start();
      Actions.main({
          ID: userID,
          Name: "test",
          FBAccessToken: this.access_token
        })
=======
      getFirebaseSelf().then((userObj)=>{
        Actions.main({
          FBAccessToken: access_token,
          userObj: userObj
        });
      },(err)=>{
        console.log(err);
      });
>>>>>>> refs/remotes/origin/master
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
