import firebaseApp from "./firebaseService";
import getUserID from "../facebook/getUserID";


//handlePressMatch handles updating the event item after a match is submitted
export default function handlePressMatch (matchID) {
  return new Promise(function(resolve, reject) {
    getUserID().then((userID)=>{
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
    }, (err)=> {
      console.log(err);
      reject(err);
    });
  });
}
