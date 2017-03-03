import firebaseApp from "./firebaseService";


export default function sendEvent (eventName, eventLocation, eventDate) {
  var db = firebaseApp().database();
  var ref = db.ref("Events/fabio"); //Add user ID here to make each event a User's
  var t = Math.round(new Date().getTime()/1000);
  var tmp = {};
  tmp.timeCreated = t;
  tmp.eventName = eventName;
  tmp.eventLocation = eventLocation;
  tmp.eventDate = eventDate;
  ref.update(tmp);
}
