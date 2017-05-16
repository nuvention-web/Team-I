import getUserID from "../facebook/getUserID";
import * as firebase from "firebase";

//Used in editEvent
//This function removes the firebase event owned by User
export default function removeFirebaseEvent () {
  return new Promise(function(resolve, reject) {
    getUserID().then((userID)=>{
      var eventRef = firebase.database().ref("Events/"+userID);
      eventRef.remove()
        .then(function() {
          console.log("Remove succeeded.");
          resolve("Remove succeeded");
        })
        .catch(function(error) {
          console.log("Remove failed: " + error.message);
          reject(err);
        });
    },(err)=>{reject(err);});
  }
);}
