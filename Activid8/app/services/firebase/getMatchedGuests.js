import getUserID from "../facebook/getUserID";
import firebaseApp from "./firebaseService";
import getFirebaseUser from "./getFirebaseUser";
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
          var guestList = [];
          for(var i in snapshot.val().matched_users){
            getFirebaseUser(snapshot.val().matched_users[i]).then(
              (guest)=>{
                guestList.push(guest);
                console.log(guest);
              },
              (err)=>{
                console.log(err);
              }
            );
          }
          resolve(guestList);
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
