import getFirebaseSelf from "./getFirebaseSelf";
import firebaseApp from "./firebaseService";

//Gets the users event if they have one
export default function getEventSelf () {
  return new Promise(function(resolve, reject) {
    getFirebaseSelf().then(
      (usr)=>{
        var userRef = firebaseApp().database().ref("Events/"+usr.userID);
        userRef.on("value", function(snapshot) {
          var exists = (snapshot.val() !== null);
          if (exists) {
            // console.log(snapshot.val());
            resolve(snapshot.val());
          }
          else {
            console.log("No Event");
            resolve(false);
          }
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
          reject(errorObject.code);
        });
      },
    (err)=>{reject(err);});
  });
}
