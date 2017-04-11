<<<<<<< Updated upstream
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";



const Login = React.createClass({

    render(){
      const title = this.props.title || "No Title";
      const data = this.props.data || "No Data";
      return (
        <View style={[styles.container, this.props.style]}>
          <Text>Login page 1</Text>
          <Text>Title: {title}</Text>
          <Text>Data: {data}</Text>
          {/* <Button onPress={() => Actions.loginModal2({ data:"Custom data2", title:"Custom title2" })}>Login 2</Button> */}
          <Button onPress={() => Actions.refresh({title:"Changed title"})}>Change title</Button>
          <Button onPress={Actions.pop}>Back</Button>
        </View>
      );
    }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  }
});



=======
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
                  }
                );
              }
            }
          }
          onLogoutFinished={() => {
            // alert("logout.");
            fbLogout();
          }}/>
      </View>
    );
  }
});

>>>>>>> Stashed changes
export default Login;
