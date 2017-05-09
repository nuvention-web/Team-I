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

      //Def:
      //Host = the person who is accepting the match
      //Guest = the person who swiped right
      var guestTemp = {};
      var hostTemp = {}
      var matched_users_for_host = [];
      var matched_users_for_guest = [];

      matched_users_for_host.push(matchID);
      matched_users_for_guest.push(userID);

      hostTemp.matched_users =  matched_users_for_host;
      guestTemp.matched_users = matched_users_for_guest;
      userRef.update(hostTemp).then(
        (val) => {
          console.log("Successfully Updated Matched Users on Host");
        },
        (err) => {
          console.log(err);
          reject(err);
        });

      guestRef.update(guestTemp).then(
        (val) => {
          console.log("Successfully Updated Matched Users on Guest");
        },
        (err) => {
          console.log(err);
          reject(err);
        });

      var accepted_guest = {accepted_guest: matchID};
      eventRef.update(accepted_guest).then(
        (val) => {
          resolve("Successfully Updated Accepted Guest on Event");
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
