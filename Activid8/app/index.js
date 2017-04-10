// app/index.js

import React, { Component} from "react";
import { View, Text, StyleSheet, Platform, Image, Navigator, TouchableOpacity} from "react-native";
import CustomTransitions from "./CustomTransitions";
// import Button from "./components/button/button";
import Button from "react-native-button";
import Home from "./components/home/home";
import Profile from "./components/profile/profile";
import CreateEvent from "./components/createEvent/createEvent";
import EventPage from "./components/eventPage/eventPage";


import Login from "./components/login/login.js";

import Launch from "./components/launch/Launch.js";
import TabIcon from "./components/tabIcon/tabIcon.js";


import Tabs from "react-native-tabs";


// const styles = require("./styles.js");



import { Scene, Reducer, Router, Switch, Modal, Actions, ActionConst } from "react-native-router-flux";

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log("ACTION:", action);
    return defaultReducer(state, action);
  };
};


// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: "#fff",
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};



export default class Activid8 extends Component {

  constructor(props) {
    super(props);
  }

  // renderScene(route, navigator) {
  //   switch (route.name) {
  //   case "Profile": //createEvent
  //     return (<View style={{top: 100}}><Profile navigator={navigator} /></View>) ;
  //   case "CreateEvent": //createEvent
  //     return (<View style={{top: 100}}><CreateEvent navigator={navigator} route={route} /></View>);
  //   case "Home":
  //     return (<View style={{top: 100}}><Home navigator={navigator} /></View>) ;
  //   case "Messages":
  //     return (<View style={{top: 100}}><Button navigator={navigator} text='Click Me!' /></View>) ;
  //   case "EventPage":
  //     return (<View style={{top: 100}}><EventPage navigator={navigator} /></View>) ;
  //   default:
  //     return (<View style={{top: 100}}><Text>Invalid Route</Text></View>);
  //   }
  //   //To pass data as well: (https://github.com/facebook/react-native/issues/4323)
  //   // return <Home navigator={navigator} data={route.data} />;
  // };

  render() {
    const profImg = require("./imgs/ryanIcon.jpg");
    const tabbarStyles = [styles.tabbar];
    const profileimg = [styles.profileimage];
    if (Platform.OS === "android") tabbarStyles.push(styles.androidTabbar);

    return (
    <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
      <Scene key="root" hideNavBar hideTabBar>
        <Scene key="launch" component={Launch} title="Launch" initial/>
        <Scene key="login" component={Login} direction="vertical" title="Login"/>
          <Scene
            key="main"
            tabs
            tabBarStyle = {styles.tabBarStyle}
            tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
          >
            <Scene key="myProfile" component={Profile} title="Profile" hideNavBar icon={TabIcon} />
            <Scene key="swipeScreen" component={Home} title="Home" hideNavBar icon={TabIcon} initial />
            <Scene key="messages" component={Button} title="Messages" hideNavBar icon={TabIcon} />
          </Scene>
          <Scene key="CreateEvent" component={CreateEvent} title="Create an Event" hideNavBar/>
          <Scene key="EventPage" component={EventPage} title="Your Event" hideNavBar/>
      </Scene>
    </Router>
    );


  }
}



const styles = StyleSheet.create({
  container: { flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarStyle: {
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        top: 64,
      },
      android: {
        top: 54,
      },
    }),
    height: 65,
    padding: 16,
  },
  tabBarSelectedItemStyle: {
    backgroundColor: "#ddd",
  },
});
