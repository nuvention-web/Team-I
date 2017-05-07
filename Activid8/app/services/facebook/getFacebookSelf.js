const FBSDK = require("react-native-fbsdk");
const {GraphRequest, GraphRequestManager, AccessToken} = FBSDK;


//Gets services/facebook/Self - gets User information from facebook - name and profile pic
export default function getFacebookSelf () {
  return new Promise(function(resolve, reject) {

    var userObj = {};

    const infoRequest = new GraphRequest(
      "/me",
      {
        httpMethod: "GET",
        version: "v2.5",
        parameters: {
          "fields": {
            "string" : "name, picture.width(800).height(800)"
          }
        }
      },
      function (error, result) {
        if (error) {
          alert("Error Getting Self Facebook data: " + error.toString());
          reject("Error fetching Self User data");
        } else {
          // console.log("In FACEBOOK SELF");
          // console.log(result.user_birthday);
          userObj.name = result.name;
          userObj.picture = result.picture.data.url;
          userObj.userID = result.id.toString();
          resolve(userObj);
        }}
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  });
}
