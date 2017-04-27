// app/components/Profile.ios.js

import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Platform } from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import Login from "../login/login";
import getFirebaseSelf from "../../services/firebase/getFirebaseSelf";

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      eventName: "none",
      refreshme: false,
      userObj: {name: "", bio: "", "picture": "http://us.kronospan-express.com/public/thumbs/600x600/decors/kronodesign/color/8100_600x600_crop_478b24840a.jpg", age: ""} //default
    };
  }

 // getEvent(eventName){
    //ideally this funciton should update state here - but for some reason it is called
    //by children and does not have access to this.state.
    // console.log("HERE");
    // console.log(eventName);
    // console.log(this);
    // // this.setState({eventName: eventName});
    // // state.eventName =  eventName;
    // // setEventName(eventName);
//  }

  // setEventName(eventName){
  //   this.setState({eventName: eventName});
  // }
  componentWillReceiveProps(nextProps)
 {
    console.log("componentWillReceiveProps");
    getFirebaseSelf().then(
      (usr)=>{
        this.setState({userObj: usr});
        console.log("Done");
      },
      (err)=>{console.log(err);});
  }

  componentWillMount() {
    getFirebaseSelf().then(
      (usr)=>{
        this.setState({userObj: usr});
        console.log("Done");
      },
      (err)=>{console.log(err);});
  }

  render() {
    var temp;

    console.log(this.state);
    if (this.state.refreshme){
      this.componentWillMount();
      this.setState({refreshme: false});
    }

    ///IF no event - create event - button
    if (this.state.eventName === "none") {
      temp = (<Button
          containerStyle={{marginRight: 20, marginLeft: 20, padding:10, height:45, borderRadius:10, backgroundColor: "#70C1B3"}}
          style={{fontSize: 14, color: "white"}}
          onPress={()=>{Actions.CreateEvent();}}
          title="Create Event"
          accessibilityLabel="Create Event"
        >
        Create Event
      </Button>);
    }
    //If has event - take to event page? - button
    else {
      temp = (<Button
          containerStyle={{marginRight: 20, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
          style={{fontSize: 14, color: "white"}}
          onPress={Actions.EventPage}
          title={this.state.eventName}
          accessibilityLabel="Got to my Event"
        >
          Event Name
        </Button>);
    }
    // var
    return (
      <ScrollView style = {styles.viewContainer}>
          <View style={{justifyContent: "center", alignItems: "center"}}>
            <Image source={{uri: this.state.userObj.picture}} style={styles.mainImage}/>
          </View>
          <Text style={styles.name}>{this.state.userObj.name}, <Text style={styles.age}>{this.state.userObj.age}</Text></Text>
          <Text style={styles.title}>Bio: </Text>
          <Text style={styles.bio}> {this.state.userObj.bio}</Text>
          <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
            <Button
                containerStyle={{marginRight: 20, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
                style={{fontSize: 14, color: "white"}}
                onPress={()=>{Actions.editProfile({userObj: this.state.userObj});}}
                accessibilityLabel="Edit Profile and Settings"
              >
                Edit Profile and Settings
            </Button>
            {temp}
          </View>
          <View style={{flex: 1, flexDirection: "row", justifyContent:"center", marginTop: 20}}>
            <Login />
          </View>
     </ScrollView>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  mainImage: {
    width: 250,
    height: 250
  },
  name: {
    fontSize: 24,
    marginTop: 20,
    color: "#70C1B3",
    marginLeft: 20
  },
  age: {
    fontSize: 24,
    marginTop: 20,
    color: "#70C1B3",
    marginLeft: 20
  },
  bio: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 40,
    paddingBottom: 50
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    color: "#70C1B3",
    marginLeft: 20
  },
  // eventButton: {
  //   // marginTop:100
  // },
  viewContainer: {
    ...Platform.select({
      ios: {
        top: 129},
      android: {
        top: 59}
    }),
  }
});
