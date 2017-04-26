import getFacebookSelf from "../facebook/getFacebookSelf";
import * as firebase from "firebase";

//This function gets the users FB pic, img and name, and places initial values in fields in Firebase DB
export default function newFirebaseUser () {
  return new Promise(function(resolve, reject) {
    getFacebookSelf().then((facebookUserObject)=>{
      var userRef = firebase.database().ref("Users/" + facebookUserObject.userID);
      facebookUserObject.bio = "Write Something Exciting Here!";
      facebookUserObject.interestedIn = "women"; //Default interestedIn
      userRef.set(facebookUserObject).then((res)=>{
        resolve(facebookUserObject);
      },(err)=>{reject(err);});
    });
  },(err)=>{reject(err);});
}
