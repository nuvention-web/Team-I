import firebaseApp from "./firebaseService";
import getUserID from "../facebook/getUserID";


//HandleSwipe Left handles updating the event item that was swiped left on.
export default function handleSwipeLeft (cardHost) {
  return new Promise(function(resolve, reject) {
    getUserID().then((userID)=>{
      var eventRef = firebaseApp().database().ref("Events/" + cardHost + "/guests");

      eventRef.update({
        [userID]: false
      }).then(
        (val) => {
          resolve("Successfully Updated Guest on Event");
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
