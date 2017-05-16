import firebaseApp from "./firebaseService";
import getUserID from "../facebook/getUserID";


//handlePressRemove handles updating the event item after a match is removed
export default function handlePressRemove (matchID) {
  return new Promise(function(resolve, reject) {
    getUserID().then((userID)=>{
      var eventRef = firebaseApp().database().ref("Events/" + userID + "/guests");

      eventRef.update({
        [matchID]: false
      }).then(
        (val) => {
          resolve("Successfully Updated Removed Guest on Event");
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
