// app/index.js

import React, { Component} from "react";
import { View, Text, StyleSheet, Platform, Image, Navigator, TouchableOpacity} from "react-native";
import CustomTransitions from "./CustomTransitions";
import Button from "./components/button/button";
import Home from "./components/home/home";
import Profile from "./components/profile/profile";
import CreateEvent from "./components/createEvent/createEvent";

const styles = require("./styles.js");


export default class Activid8 extends Component {

  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    switch (route.name) {
    case "Profile": //createEvent
      return (<View style={{top: 100}}><Profile navigator={navigator} /></View>) ;
    case "CreateEvent": //createEvent
      return (<View style={{top: 100}}><CreateEvent navigator={navigator} route={route} /></View>);
    case "Home":
      return (<View style={{top: 100}}><Home navigator={navigator} /></View>) ;
    case "Messages":
      return (<View style={{top: 100}}><Button navigator={navigator} text='Click Me!' /></View>) ;
    default:
      return (<View style={{top: 100}}><Text>Invalid Route</Text></View>);
    }
    //To pass data as well: (https://github.com/facebook/react-native/issues/4323)
    // return <Home navigator={navigator} data={route.data} />;
  };

  render() {
    const profImg = require("./imgs/ryanIcon.jpg");
    const tabbarStyles = [styles.tabbar];
    const profileimg = [styles.profileimage];
    if (Platform.OS === "android") tabbarStyles.push(styles.androidTabbar);

    return (
        <Navigator
          initialRoute={{name: "Home", index: 0}}
          renderScene={ this.renderScene }
          configureScene={(route, routeStack) => CustomTransitions.NONE}
          navigationBar = {
            <Navigator.NavigationBar
             routeMapper={{
               LeftButton: (route, navigator, index, navState) =>
               {
                 return (
                  <TouchableOpacity
                    style={{paddingLeft: 20}}
                    onPress={() => navigator.resetTo({name: "Profile", index: 0})}>
                      <Image source={profImg} style={profileimg}/>
                  </TouchableOpacity>);
               },
               RightButton: (route, navigator, index, navState) =>
               {
                 return (
                  <TouchableOpacity
                    style={{paddingRight: 20}}
                    onPress={() => navigator.resetTo({name: "Messages", index: 0})}>
                    <Text
                      style={{fontSize: 18, top: 5}}>
                        Messages
                    </Text>
                  </TouchableOpacity>);
               },
               Title: (route, navigator, index, navState) =>
               {
                 return (
                  <TouchableOpacity
                    style={{paddingRight: 5}}
                    onPress={() => navigator.resetTo({name: "Home", index: 0})}>
                      <Text
                        style={{fontSize: 18, top: 5}}>
                          Home
                      </Text>
                  </TouchableOpacity>);
               },
             }}
             style={tabbarStyles}
           />
          }
        />
    );
  }
}
