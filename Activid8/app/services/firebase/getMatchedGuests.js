import getUserID from "../facebook/getUserID";
import firebaseApp from "./firebaseService";
import newFirebaseUser from "./newFirebaseUser";


//Gets services/firebase/Self - gets User information from firebase
//IF new user - pulls some default facebook info and reuploads to Firebase
export default function getFirebaseSelf () {
  return new Promise(function(resolve, reject) {
    getUserID().then((userID)=>{
      var userRef = firebaseApp().database().ref("Users/"+userID);
      userRef.on("value", function(snapshot) {
        var exists = (snapshot.val().matched_users !== null);
        if (exists) {
          // console.log(snapshot.val());
          resolve(snapshot.val().matched_users);
        }
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    },(err)=>{
      console.log(err);
      reject(err);
    });
  });
}
