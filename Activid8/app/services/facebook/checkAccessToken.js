const FBSDK = require("react-native-fbsdk");
const { AccessToken } = FBSDK;
import fbLogin from "../firebase/fbLogin";

export default function checkAccessToken () {
  AccessToken.getCurrentAccessToken().then(
              (data) => {
                if(data){
                  fbLogin(data.accessToken); //Login with Access Token to Firebase
                }
                else console.log("No Facebook Access Token");} //Refresh it every time
            );
}
