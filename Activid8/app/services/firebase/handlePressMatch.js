import * as firebase from "firebase";
import getUserID from "../facebook/getUserID";


//handlePressMatch handles updating the event item after a match is submitted
//It updates an event's accepted guest, and adds the user id to the list of
//matched people in the host's database, as well as the pointer to the chats
export default function handlePressMatch (matchID) {
  return new Promise(function(resolve, reject) {
    getUserID().then((userID)=>{
      var updates = {};
      updates["Users/" + userID + "/matched_users/" + matchID.toString() + "userID"] = matchID;
      updates["Users/" + matchID + "/matched_users/"+ userID.toString() + "userID"] = userID;
      updates["Users/" + matchID + "/matched_users/"+ userID.toString() + "chatID"] = userID + matchID;
      updates["Users/" + userID + "/matched_users/"+ userID.toString() + "chatID"] = userID + matchID;
      updates["Events/" + userID + "/accepted_guest"] = matchID;
      updates["Chats/" + userID + matchID + "/participantOne"] = userID;
      updates["Chats/" + userID + matchID + "/participantTwo"] = matchID;
      console.log("here");
      firebase.database().ref().update(updates).then((res)=>{
        resolve("Success");
      },(err)=>{reject(err);});
    });
  });
}
