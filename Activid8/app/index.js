// app/index.js

import React, { Component} from "react";
import { View, Text, StyleSheet, Platform, Image } from "react-native";
import Tabs from "react-native-tabs";
import Button from "./components/button/button";
import Home from "./components/home/home.ios"


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
      page: "home"
    };
  }
  // console.log(keys);

  render() {
    const { page } = this.state;
    // console.log(this.state);
    // const temp = <Button text='Click Me!' />;


    const profImg = require("./imgs/FabioIcon.png");

    var temp = (<Text>State: {page} does not have handler</Text>);
    if (this.state.page == "profile") temp = (<Text>PROFILE</Text>);
    if (this.state.page == "home"){ temp = (<Home style={{flex: 1, height: 300}}/>);}
    if (this.state.page == "messages"){ temp = (<Text>MESSAGE LIST</Text>);}

    // function testFunc(state) {
    //   let description;
    //   if (state.page == "home") {
    //     description = <Button text="Click Me!" />;
    //   } else {
    //     description = <Text>No Button</Text>;
    //   }
    //   return <div>{description}</div>;
    // }

    const tabbarStyles = [styles.tabbar];
    const profileimg = [styles.profileimage];
    if (Platform.OS === "android") tabbarStyles.push(styles.androidTabbar);

    return (
      <View style={[styles.container]}>
        <Tabs
          selected={page}
          style={tabbarStyles}
          selectedStyle={{color:"red"}} onSelect={el=>this.setState({page:el.props.name})}
        >
            <Text name="profile">
              <Image source={profImg} style={profileimg}/>
            </Text>
            <Text name="home">Home</Text>
            <Text name="messages">Messages</Text>
        </Tabs>

        {temp}
      </View>
    );
  }
}
