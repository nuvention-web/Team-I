import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

import fbLogin from "../../services/firebase/fbLogin";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "red",
  }
});


const FBSDK = require("react-native-fbsdk");
const {
  LoginButton,
  AccessToken
} = FBSDK;

var Login = React.createClass({
  render: function() {
    return (
      <View>
        <LoginButton
          readPermissions={["public_profile", "email", "user_friends"]}
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
                    alert(data.accessToken.toString());
                  }
                );
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
});

class Launch extends React.Component {
  render(){
    return (
      <View {...this.props}  style={styles.container}>
        <Text>Launch page</Text>
        <Button onPress={()=>Actions.login({data:"Custom data", title:"Custom title" })}>Go to Login page</Button>
        <Button onPress={Actions.main}>Go to TabBar page</Button>
        <Login />
      </View>
    );
  }
}

module.exports = Launch;
