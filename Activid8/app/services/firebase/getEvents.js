import firebaseApp from "./firebaseService";


export default function getEvents () {
  var eventDB = firebaseApp().database().ref("Events");

  console.log("in getEvents");
  // eventDB.on("value", (dataSnapshot) => {
  //   dataSnapshot.forEach((child) => {
  //     console.log(child.val().name); });
  // });

  eventDB.on("value", function(snapshot) {
    console.log(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  
  return;
}
