// app/components/Profile.ios.js

import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet, Button, Image, ScrollView } from "react-native";
import CreateEvent from "../createEvent/createEvent";

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      eventName: "Museum Date"
    };
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
          onPress={()=>this.props.navigator.push({name: "CreateEvent", getEvent: this.getEvent})}
          title="Create Event"
          accessibilityLabel="Create Event"
        />);
    }
    //If has event - take to event page? - button
    else {
      temp = (<Button
          style={styles.eventButton}
          onPress={()=>this.props.navigator.push({name: "EventPage", getEvent: this.getEvent})}
          title={this.state.eventName}
          accessibilityLabel="Got to my Event"
        />);
    }

    return (
      <ScrollView>
          <View style={{flex: 1, flexDirection: "row"}}>
            <Image source={ryanMain} style={styles.mainImage}/>
            <View style={{flex: 1, flexDirection: "column"}}>
              <Image resizeMode="cover" source={ryan1} style={styles.topImage}/>
              <Image resizeMode="cover" source={ryan2} style={styles.botImage}/>
            </View>
          </View>
          <Text style={styles.title}>Bio: </Text>
          <Text style={styles.bio}> I'm Ryan Gosling.</Text>
          {temp}
     </ScrollView>
    );
  }
}

Profile.propTypes = {
  navigator: PropTypes.object.isRequired,
  // eventName: PropTypes.string.isRequired
};

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
    paddingBottom: 200
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    color: "#FF851B",
    marginLeft: 20
  },
  eventButton: {
    // marginTop:100
  }

});
