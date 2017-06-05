import getUserID from "../facebook/getUserID";
import firebaseApp from "./firebaseService";

//Gets the users event if they have one
export default function getChatInfo (chatID) {
  return new Promise(function(resolve, reject) {
    var chatRef = firebaseApp().database().ref("Chats/"+chatID);
    chatRef.on("value", function(snapshot) {
      var exists = (snapshot.val() !== undefined);
      var chatObj = {};
      if (exists) {
        chatObj.eventDate = snapshot.val().eventDate;
        chatObj.eventName = snapshot.val().eventName;
        chatObj.eventLocation = snapshot.val().eventLocation;
        resolve(chatObj);
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      reject(errorObject.code);
    });
  });
}
