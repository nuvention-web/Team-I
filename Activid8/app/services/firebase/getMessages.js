import getUserID from "../facebook/getUserID";
import firebaseApp from "./firebaseService";

//Gets the users event if they have one
export default function getMessages (chatID) {
  return new Promise(function(resolve, reject) {
    var chatRef = firebaseApp().database().ref("Chats/"+chatID);
    chatRef.on("value", function(snapshot) {
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
