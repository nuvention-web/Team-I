import firebaseApp from "./firebaseService";
import fbLogin from "./fbLogin.js"
const FBSDK = require("react-native-fbsdk");
const {
  LoginButton,
  AccessToken
} = FBSDK;

console.log("test");
export default function sendEvent (eventName, eventLocation, eventDate) {
  AccessToken.getCurrentAccessToken().then(
    (data) => {
  var db = firebaseApp().database();
  var id = data.userID           
  var ref = db.ref("Events/" + id) //Add user ID here to make each event a User's
  var t = Math.round(new Date().getTime()/1000);
  var tmp = {};
  tmp.timeCreated = t;
  tmp.eventName = eventName;
  tmp.eventLocation = eventLocation;
  tmp.eventDate = eventDate;
  ref.update(tmp);
  })
}
