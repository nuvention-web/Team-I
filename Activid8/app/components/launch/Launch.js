import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

import fbLogin from "../../services/firebase/fbLogin";
<<<<<<< Updated upstream


=======
import Login from "../login/login";
import checkAccessToken from "../../services/facebook/checkAccessToken";


const FBSDK = require("react-native-fbsdk");
const { AccessToken } = FBSDK;

>>>>>>> Stashed changes
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


<<<<<<< Updated upstream
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
=======
class Launch extends React.Component {
  componentWillMount(){
    checkAccessToken();
  }

  render(){
    return (
      <View {...this.props}  style={styles.container}>
        <Text>WELCOME TO MUSE - LOGIN BELOW</Text>
>>>>>>> Stashed changes
        <Login />
      </View>
    );
  }
}

module.exports = Launch;
