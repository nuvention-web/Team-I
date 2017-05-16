import getUserID from "../facebook/getUserID";
import * as firebase from "firebase";

//Used in editEvent
//This function saves the firebase event passed into it
export default function saveFirebaseUser (eventObj) {
  return new Promise(function(resolve, reject) {
    getUserID().then((userID)=>{
      var updates = {};
      updates["Events/" + userID + "/eventName"] = eventObj.eventName;
      updates["Events/" + userID + "/eventDate"] = eventObj.eventDate;
      updates["Events/" + userID + "/eventLocation"] = eventObj.eventLocation;
      firebase.database().ref().update(updates).then((res)=>{
        resolve(eventObj);
      },(err)=>{reject(err);});
    });
  },(err)=>{reject(err);});
}
