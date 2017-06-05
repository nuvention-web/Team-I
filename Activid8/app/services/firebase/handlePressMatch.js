import * as firebase from "firebase";
import getUserID from "../facebook/getUserID";
import getEvent from "./getEvent";


//handlePressMatch handles updating the event item after a match is submitted
//It updates an event's accepted guest, and adds the user id to the list of
//matched people in the host's database, as well as the pointer to the chats
export default function handlePressMatch (matchID) {
  return new Promise(function(resolve, reject) {
    getUserID().then(
      (userID)=>{
      var updates = {};
      getEvent(userID).then(
        (event)=>{
          updates["Chats/" + userID + matchID + "/eventDate"] = event.eventDate;
          updates["Chats/" + userID + matchID + "/eventLocation"] = event.eventLocation;
          updates["Chats/" + userID + matchID + "/eventName"] = event.eventName;

          updates["Users/" + userID + "/matched_users/" + matchID + "/userID"] = matchID;
          updates["Users/" + userID + "/matched_users/" + matchID + "/chatID"] = userID + matchID;

          updates["Users/" + matchID + "/matched_users/"+ userID + "/userID"] = userID;
          updates["Users/" + matchID + "/matched_users/"+ userID + "/chatID"] = userID + matchID;
          
          updates["Events/" + userID + "/accepted_guest"] = matchID;

          updates["Chats/" + userID + matchID + "/eventOwner"] = userID;
          updates["Chats/" + userID + matchID + "/eventGuest"] = matchID;
          firebase.database().ref().update(updates).then((res)=>{
            resolve("Success");
          },(err)=>{reject(err);});
        }
      );
    });
  });
}
