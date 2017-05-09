import firebaseApp from "./firebaseService";
// import getUserID from "../facebook/getUserID";
import getFirebaseSelf from "./getFirebaseSelf";


//Get event cards currently gets all events in ref Events along with associated user information that might be relevant for card info
//This is where you might want to implement filtering cards by gender/interest/location/time/creator
export default function getEventCards () {
  return new Promise(function(resolve, reject) {
    getFirebaseSelf().then((userSelf)=>{
      const eventRef = firebaseApp().database().ref("Events");
      var numProcessed = 0;
      var Cards = [];
      eventRef.on("value", (dataSnapshot) => {
        var arr_length = Object.keys(dataSnapshot.val()).length;
        dataSnapshot.forEach((child) => {
          var card = {};
          var cardOwnerRef = firebaseApp().database().ref("Users/" + child.val().host);
          card.eventTitle = child.val().eventName;
          card.eventLocation = child.val().eventLocation;
          card.host = child.val().host;
          card.eventDate = child.val().eventDate;
          cardOwnerRef.on("value", (ownerSnapshot) => {
            card.name = ownerSnapshot.val().name;
            card.image = ownerSnapshot.val().picture;
            card.bio = ownerSnapshot.val().bio;
            card.age = ownerSnapshot.val().age;
            card.gender = ownerSnapshot.val().gender;
            card.interestedIn = ownerSnapshot.val().interestedIn;
            if (matchPossible(userSelf, ownerSnapshot.val(), child.val().guests)){
              Cards.push(card);
              numProcessed++;
            }
            else {
              numProcessed++;
            }
            if (numProcessed === arr_length){
              resolve(Cards);
            }
          });
        });
      });
    }, (err)=> {
      console.log(err);
      reject(err);
    });
  });
}


//Check based on gender/interestedIn preferences
function matchPossible(user1, user2, guests){
  if (typeof guests === "undefined"){ //case if card is new and has no guest attribute
    if (user1.gender === user2.interestedIn && user2.gender === user1.interestedIn && user1.userID !== user2.userID){  //match possible
      return true;
    }
    else return false;
  }
  else if (typeof guests[user1.userID] === "undefined"){ //check guests if have already swiped on
    if (user1.gender === user2.interestedIn && user2.gender === user1.interestedIn && user1.userID !== user2.userID){ //match possible
      return true;
    }
    else return false;
  }
  else return false;
}
