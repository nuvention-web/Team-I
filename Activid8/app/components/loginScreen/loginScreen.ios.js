import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import Login from "../login/login";
import checkAccessToken from "../../services/facebook/checkAccessToken";


class LoginScreen extends React.Component {
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
        <Text style={styles.text}>
          WELCOME TO MUSE
        </Text>
        <Login />
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
  },
  text: {
    color: "white",
    fontSize: 14,
    paddingBottom: 25
  }
});
module.exports = LoginScreen;
