import firebaseApp from "./firebaseService";
import getUserID from "../facebook/getUserID";


//handlePressMatch handles updating the event item after a match is submitted
//It updates an event's accepted guest, and adds the user id to the list of
//matched people in the host's database
export default function handlePressMatch (matchID) {
  return new Promise(function(resolve, reject) {
    getUserID().then((userID)=>{
      var userRef = firebaseApp().database().ref("Users/" + userID);
      var guestRef = firebaseApp().database().ref("Users/" + matchID);
      var eventRef = firebaseApp().database().ref("Events/" + userID);
      var accepted_guest = {accepted_guest: matchID};
      eventRef.update(accepted_guest).then(
        (val) => {
          resolve("Successfully Updated Accepted Guest on Event");
        },
        (err) => {
          console.log(err);
          reject(err);
        });

      var guestTemp = {};
      var matched_users = [];
      matched_users.push(userID);
      guestTemp.matched_users = matched_users;
      userRef.update(guestTemp).then(
        (val) => {
          resolve("Successfully Updated Matched Users on Host);
        },
        (err) => {
          console.log(err);
          reject(err);
        });
     guestRef.update(guestTemp).then(
        (val) => {
          resolve("Successfully Updated Matched Users on Guest");
        },
        (err) => {
          console.log(err);
          reject(err);
        });
    }, (err)=> {
      console.log(err);
      reject(err);
    });
  });
}
