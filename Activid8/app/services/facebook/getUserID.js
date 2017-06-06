const FBSDK = require("react-native-fbsdk");
const { AccessToken } = FBSDK;
import fbLogin from "../firebase/fbLogin";
import {Actions} from "react-native-router-flux";

export default function getuserID (){
  return new Promise(function(resolve, reject) {
    AccessToken.getCurrentAccessToken().then(
                (data) => {
                  if(data){
                    // console.log("In Get User ID: ");
                    // console.log(data);
                    // resolve("10207417484470250");
                    resolve(data.userID);
                  }
                  else {
                    Actions.loginScreen();
                    reject("No Facebook Access Token");
                  }
                }
              );
  });
}
