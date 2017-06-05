// app/index.js

import React, { Component} from "react";
import { View, Text, StyleSheet, Platform, Image, Navigator, TouchableOpacity} from "react-native";
import Tabs from "react-native-tabs";
import { Scene, Reducer, Router, Switch, Modal, Actions, ActionConst } from "react-native-router-flux";

import CustomTransitions from "./CustomTransitions";
import Button from "react-native-button";
import Home from "./components/home/home";
import Profile from "./components/profile/profile";
import CreateEvent from "./components/createEvent/createEvent";
import EventPage from "./components/eventPage/eventPage";
import Login from "./components/login/login.js";
import Launch from "./components/launch/Launch.js";
import LoginScreen from "./components/loginScreen/loginScreen";
import editProfile from "./components/editProfile/editProfile";
import EditEvent from "./components/editEvent/editEvent";
import EventDetails from "./components/eventDetails/eventDetails"

import MatchList from "./components/matchList/matchList";

import Messaging from "./components/messaging/messaging";
import matchProfile from "./components/matchProfile/matchProfile";
import ChatBox from "./components/chatBox/chatBox";

import TabIcon from "./components/tabIcon/tabIcon.js";

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    // console.log("ACTION:", action);
    // if (action.type === "REACT_NATIVE_ROUTER_FLUX_JUMP"){
    //   console.log(state);
    // }
    // console.log(state);
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


  render() {

    return (
    <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
      <Scene key="root" hideNavBar hideTabBar>
        <Scene key="launch" component={Launch} title="Launch" initial/>
        <Scene key="loginScreen" component={LoginScreen} title="Login" type={ActionConst.RESET}/>
          <Scene
            key="main"
            tabs
            tabBarStyle = {styles.tabBarStyle}
            tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
          >
            <Scene key="myProfile" component={Profile} title="Profile" hideNavBar icon={TabIcon} />
            <Scene key="myEvent" component={EventPage} title="My Event" hideNavBar icon={TabIcon} />
            <Scene key="home" component={Home} title="Home" hideNavBar icon={TabIcon} initial />
            <Scene key="messaging" component={Messaging} title="Messaging" hideNavBar icon={TabIcon} />
          </Scene>
          <Scene key="editProfile" component={editProfile} title="Edit Profile" hideNavBar/>
          <Scene key="editEvent" component={EditEvent} title="Edit Event" hideNavBar/>

          <Scene key="matchList" clone component={MatchList} title="Match List" hideNavBar/>
          <Scene key="CreateEvent" component={CreateEvent} title="Create an Event" hideNavBar/>
          {/* <Scene key="EventPage" clone component={EventPage} title="Your Event" hideNavBar/> */}
          <Scene key="matchProfile" clone component={matchProfile} title="Profile" hideNavBar/>
          <Scene key="chatBox" component={ChatBox} title="Chat Box" hideNavBar/>
          <Scene key="eventDetails" component={EventDetails} title="Event Details" hideNavBar/>
      </Scene>
    </Router>
    );
  }
}


const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        top: 20,
      },
      android: {
        top: 0,
      },
    }),
    height: 65,
    // padding: 10,
  },
  tabBarSelectedItemStyle: {
    backgroundColor: "#ddd",
  },
});
