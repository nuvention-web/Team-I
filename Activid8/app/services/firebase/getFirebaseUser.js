import getUserID from "../facebook/getUserID";
import firebaseApp from "./firebaseService";

//Gets services/firebase/Self - gets User information from firebase
export default function getFirebaseUser (userID) {
  return new Promise(function(resolve, reject) {
    var userRef = firebaseApp().database().ref("Users/"+userID);
    userRef.on("value", function(snapshot) {
      var exists = (snapshot.val() !== null);
      if (exists) {
        // console.log(snapshot.val());
        resolve(snapshot.val());
      }
      else {
        reject(err);
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      reject(errorObject.code);
    });
  });
}
