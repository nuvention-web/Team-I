// app/index.js

import React, { Component} from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Tabs from "react-native-tabs";
import Button from "./components/button/button";

const styles = require("./styles.js");

// const keys = require("./firebaseKeys.js");
// import * as firebase from "firebase";
// console.log(keys);
//
// // Initialize default app
// // Retrieve your own options values by adding a web app on
// // https://console.firebase.google.com
//
// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: keys.apiKey, // Auth / General Use
//   authDomain: "<your-auth-domain>", // Auth with popup/redirect
//   databaseURL: keys.databaseURL, // Realtime Database
//   storageBucket: "<your-storage-bucket>", // Storage
//   messagingSenderId: "123456789"                  // Cloud Messaging
// };
// const firebaseApp = firebase.initializeApp(firebaseConfig);


export default class Activid8 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "first"
    };
  }
  // console.log(keys);

  render() {
    const { page } = this.state;
    const background = styles[page];
    const tabbarStyles = [styles.tabbar];
    if (Platform.OS === "android") tabbarStyles.push(styles.androidTabbar);

    return (
      <View style={[styles.container, background]}>
        <Tabs
          selected={page}
          style={tabbarStyles}
          selectedStyle={{color:"red"}} onSelect={el=>this.setState({page:el.props.name})}
        >
            <Text name="first">First</Text>
            <Text name="second">Second</Text>
            <Text name="third">Third</Text>
        </Tabs>

        <Text>Activid8 App</Text>
        <Text>{page}</Text>
        <Button text="Click Me!" />
      </View>
    );
  }
}
