import firebaseApp from "./firebaseService";
import getUserID from "../facebook/getUserID";


//Get event cards currently gets all events in ref Events along with associated user information that might be relevant for card info
//This is where you might want to implement filtering cards by gender/interest/location/time/creator
export default function getEventCards () {
  return new Promise(function(resolve, reject) {
    getUserID().then((userID)=>{
      const eventRef = firebaseApp().database().ref("Events");
      var numPushed = 0;
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
            Cards.push(card);
            numPushed++;
            if (Cards.length === arr_length){
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
