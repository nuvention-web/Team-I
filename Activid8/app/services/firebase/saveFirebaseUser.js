import getUserID from "../facebook/getUserID";
import * as firebase from "firebase";

//Used in editProfile
//This function saves the firebase user passed into it
//- updates current values for gender, age, interestedIn and bio
export default function saveFirebaseUser (userObj) {
  return new Promise(function(resolve, reject) {
    getUserID().then((userID)=>{
      var updates = {};
      updates["Users/" + userID + "/gender"] = userObj.gender;
      updates["Users/" + userID + "/age"] = userObj.age;
      updates["Users/" + userID + "/interestedIn"] = userObj.interestedIn;
      updates["Users/" + userID + "/bio"] = userObj.bio;
      firebase.database().ref().update(updates).then((res)=>{
        resolve(userObj);
      },(err)=>{reject(err);});
    });
  },(err)=>{reject(err);});
}
