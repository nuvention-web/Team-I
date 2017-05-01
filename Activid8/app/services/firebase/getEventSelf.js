import getUserID from "../facebook/getUserID";
import firebaseApp from "./firebaseService";

//Gets the users event if they have one
export default function getEventSelf (userID) {
  return new Promise(function(resolve, reject) {
    var userRef = firebaseApp().database().ref("Events/"+userID);
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
  });
}
