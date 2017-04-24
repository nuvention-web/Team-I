// app/components/Profile.ios.js

import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Platform } from "react-native";
import CreateEvent from "../createEvent/createEvent";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";


import Login from "../login/login";

var user = {}
class Profile extends Component {

  constructor(props) {
    super(props);
    this.state ={
      loggedIn: false
    }
    user ={
      name: this.props.Name,
      mainPic: this.props.MainPicture,
    }
    this.state = {
      loggedIn: true,   //This needs to happen after user is declared because otherwise it will try to render a null user
      eventName: "Museum Date"
    }
    console.log(user);
  }

  getEvent(eventName){
    //ideally this funciton should update state here - but for some reason it is called
    //by children and does not have access to this.state.
    // console.log("HERE");
    // console.log(eventName);
    // console.log(this);
    // // this.setState({eventName: eventName});
    // // state.eventName =  eventName;
    // // setEventName(eventName);
  }

  setEventName(eventName){
    this.setState({eventName: eventName});
  }

  render() {  	
    const ryanMain = require("../../imgs/ryanIcon.jpg");
    const ryan1 = require("../../imgs/ryan1.jpg");
    const ryan2 = require("../../imgs/ryan2.jpg");
    
    var temp;

    ///IF no event - create event - button
    if (this.state.eventName === "none") {
      temp = (<Button
          style={styles.eventButton}
          onPress={Actions.CreateEvent}
          title="Create Event"
          accessibilityLabel="Create Event"
        >
        Create Event
      </Button>);
    }
    //If has event - take to event page? - button
    else {
      temp = (<Button
          style={styles.eventButton}
          onPress={Actions.EventPage}
          title={this.state.eventName}
          accessibilityLabel="Got to my Event"
        >
          Event Name
        </Button>);
    }
    if(this.state.loggedIn){
      return (
        <ScrollView style = {styles.viewContainer}>
            <View style={{flex: 1, flexDirection: "row"}}>
              <Image source={ryanMain} style={styles.mainImage}/>
              <View style={{flex: 1, flexDirection: "column"}}>
                <Image resizeMode="cover" source={ryan1} style={styles.topImage}/>
                <Image resizeMode="cover" source={ryan2} style={styles.botImage}/>
              </View>
            </View>
            
            <Text style={styles.title}>Name: </Text>
            <Text> {user.name}</Text>
            <Text style={styles.title}>Bio: </Text>
            <Text style={styles.bio}> I'm Ryan Gosling.</Text>
            {temp}
            <Login />
        </ScrollView>
      );
    }
  }
}

// Profile.propTypes = {
//   navigator: PropTypes.object.isRequired,
//   // eventName: PropTypes.string.isRequired
// };

export default Profile;


const styles = StyleSheet.create({
  mainImage: {
    width: 250,
    height: 250
  },
  topImage: {
    width: 125,
    height: 125
  },
  botImage: {
    width: 125,
    height: 125
  },
  bio: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 40,
    paddingBottom: 100
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    color: "#FF851B",
    marginLeft: 20
  },
  eventButton: {
    // marginTop:100
  },
  viewContainer: {
    ...Platform.select({ios: {top: 129},android: {top: 69}}),
  }


});
