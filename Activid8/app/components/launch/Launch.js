import React from "react";
import {View, Image, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

import checkAccessToken from "../../services/facebook/checkAccessToken";


const FBSDK = require("react-native-fbsdk");
const { 
  AccessToken,
} = FBSDK;


class Launch extends React.Component {
  componentWillMount(){
    checkAccessToken();
  }

  render(){
    return (
      <View {...this.props}  style={styles.container}>
        <Image
          source={require("../../imgs/muse.png")}
          style={styles.image}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6DC2B3",
  },
  image: {
    width: 300,
    height: 100,
  }
});

module.exports = Launch;
