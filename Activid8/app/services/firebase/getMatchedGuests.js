import firebaseApp from "./firebaseService";
import getFirebaseSelf from "./getFirebaseSelf";
import getFirebaseUser from "./getFirebaseUser";

//Gets services/firebase/getMatchedGuests
//- gets User information from firebase for all matched guests
export default function getMatchedGuests () {
  return new Promise(function(resolve, reject) {
    getFirebaseSelf().then((u_self)=>{
      var guestList = [];
      l = 0;
      if (typeof u_self.matched_users !== "undefined"){
        var keys = [];
        for(var user in u_self.matched_users){
          if (u_self.matched_users.hasOwnProperty(user)){
            getFirebaseUser(user).then(
            (guest)=>{
              guestList.push(guest);
              l++;
              if (l >= Object.keys(u_self.matched_users).length){
                resolve(guestList);
              }
            },
            (err)=>{console.log(err);});
          }
        }
      }
      else resolve(guestList);
    },(err)=>{
      console.log(err);
      reject(err);
    });
  });
}
