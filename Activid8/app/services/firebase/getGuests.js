import getUserID from "../facebook/getUserID";
import firebaseApp from "./firebaseService";
import getFirebaseUser from "./getFirebaseUser";

//Gets services/firebase/getGuests - gets all the user profiles of all the Guests on a given eventObj
export default function getGuests (eventObj) {
  return new Promise(function(resolve, reject) {
    if (typeof eventObj.guests === "undefined"){
      resolve ("No Guests");
    }
    else {
      console.log(eventObj.guests);
      var promises = [];

      for (var guestID in eventObj.guests) {
        if(eventObj.guests[guestID] === true)
          promises.push(getFirebaseUser(guestID));
      }
      Promise.all(promises).then(
        (users)=>{
          resolve(users);
        },(err)=>{
        console.log(err);
        reject(err);
      });
    }
  });
}
