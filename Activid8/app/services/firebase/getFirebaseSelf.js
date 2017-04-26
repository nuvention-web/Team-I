import getUserID from "../facebook/getUserID";
import firebaseApp from "./firebaseService";
import newFirebaseUser from "./newFirebaseUser";


//Gets services/firebase/Self - gets User information from firebase
//IF new user - pulls some default facebook info and reuploads to Firebase
export default function getFirebaseSelf (userID) {
  return new Promise(function(resolve, reject) {

    getUserID().then((userID)=>{
      var userRef = firebaseApp().database().ref("Users/"+userID);
      userRef.on("value", function(snapshot) {
        var exists = (snapshot.val() !== null);
        if (exists) resolve(snapshot.val());
        else {
          console.log("New User");
          newFirebaseUser().then((userObj)=>{resolve(userObj);},
            (err)=>{reject(err);});
        }
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    },(err)=>{
      console.log(err);
      reject(err);
    });
  });
}


// function saveUser(userObj){
//   return new Promise(function(resolve, reject) {
//     var userRef = firebase.database().ref("Users/" + userObj.userID);
//     userRef.set({
//       name: userObj.name,
//       picture: userObj.picture,
//       bio: userObj.bio,
//       events: userObj.events,
//       interestedIn: userObj.interestedIn,
//       matches: userObj.matches
//     });
//   });
// }
