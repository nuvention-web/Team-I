import firebaseApp from "./firebaseService";
import getUserID from "../facebook/getUserID";
import {Actions} from "react-native-router-flux";

export default function sendEvent (eventName, eventLocation, eventDate) {
  getUserID().then((userID)=>{
    var db = firebaseApp().database();
    var ref = db.ref("Events/" + userID); //Add user ID here to make each event a User's
    var t = Math.round(new Date().getTime()/1000);
    var tmp = {};
    tmp.timeCreated = t;
    tmp.eventName = eventName;
    tmp.eventLocation = eventLocation;
    tmp.eventDate = eventDate;
    tmp.host = userID;
    tmp.guests = [];
    tmp.accepted_guest = "";
    ref.update(tmp);
    Actions.pop();
  }, (err)=>{console.log(err);});
}
