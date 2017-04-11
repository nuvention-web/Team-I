import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

import fbLogin from "../../services/firebase/fbLogin";
import Login from "../login/login";
import checkAccessToken from "../../services/facebook/checkAccessToken";


const FBSDK = require("react-native-fbsdk");
const { AccessToken } = FBSDK;


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


class Launch extends React.Component {
  componentWillMount(){
    checkAccessToken();
  }

  render(){
    return (
      <View {...this.props}  style={styles.container}>
        <Text>WELCOME TO MUSE - LOGIN BELOW</Text>
        <Login />
      </View>
    );
  }
}

module.exports = Launch;
