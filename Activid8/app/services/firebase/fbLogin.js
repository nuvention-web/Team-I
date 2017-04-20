import * as firebase from "firebase";
import {Actions} from "react-native-router-flux";
import getUserID from "../facebook/getUserID";
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
        var userRef = firebase.database().ref("Users/" + userID);
        userRef.set({
          name: result.name,
          picture: result.picture.data.url,
        });
        Actions.home({
          ID: userID,
        })
      })

  }
};

export default function fbLogin (access_token) {// Build Firebase credential with the Facebook access token.
  var credential = firebase.auth.FacebookAuthProvider.credential(access_token);

  // Sign in with credential from the Google user.
  firebase.auth().signInWithCredential(credential).then(
    function(){
      console.log("Firebase Signed In Successfully");
      Actions.main({FBAccessToken: access_token});

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