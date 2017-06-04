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
      console.log(typeof u_self.matched_users);
      if (typeof u_self.matched_users !== "undefined"){
      	console.log("bye");
        var keys = [];
        Object.keys(u_self.matched_users).forEach(function(key,index) {
    	// key: the name of the object key
    	// index: the ordinal position of the key within the object 
    		var obj = u_self.matched_users[key];
    		console.log(obj.chatID);
    		console.log(obj.userID);
    		getFirebaseUser(matchInfo).then(
            (guest)=>{
              guest.chatID = obj.chatID;
              guest.userID = obj.userID;
              console.log(guest);
              guestList.push(guest);
              l++;
              if (l >= Object.keys(u_self.matched_users).length){
                resolve(guestList);
              }
            },
            (err)=>{console.log(err);});
		});        
      }
      else resolve(guestList);
    },(err)=>{
      console.log(err);
      reject(err);
    });
  });
}
