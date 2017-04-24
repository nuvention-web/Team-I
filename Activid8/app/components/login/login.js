import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

import fbLogin from "../../services/firebase/fbLogin";
import fbLogout from "../../services/firebase/fbLogout";


const FBSDK = require("react-native-fbsdk");
const {
  LoginButton,
  AccessToken
} = FBSDK;

const Login = React.createClass({ //This is not a login screen component but the login button with our special login
  render: function() {
    return (
      <View>
        <LoginButton
          readPermissions={["public_profile", "email", "user_friends", "user_photos"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data);
                    fbLogin(data.accessToken);
                  }
                );
              }
            }
          }
          onLogoutFinished={() => {
            fbLogout();
          }}
          style={styles.loginButton}
          />
      </View>
    );
  }
});


const styles = StyleSheet.create({
  loginButton: {
    width: 200,
    height: 25
  }
});

export default Login;
