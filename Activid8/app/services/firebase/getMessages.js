import getUserID from "../facebook/getUserID";
import firebaseApp from "./firebaseService";

//Gets the users event if they have one
export default function getMessageSelf (eventID) {
  return new Promise(function(resolve, reject) {
    var userRef = firebaseApp().database().ref("Events/"+eventID);
    userRef.on("value", function(snapshot) {
      var exists = (snapshot.val().messages !== undefined);
      
      if (exists) {
        resolve(snapshot.val().messages);
      }
      else {
        console.log("No Messages");
        resolve([]);
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      reject(errorObject.code);
    });
  });
}
