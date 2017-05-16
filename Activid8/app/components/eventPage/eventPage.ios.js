import React, { Component, PropTypes} from "react";
import {Platform, AppRegistry, ListView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image, RefreshControl} from "react-native";
import Button from "react-native-button";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import {Actions} from "react-native-router-flux";
import getGuests from "../../services/firebase/getGuests";
import handlePressMatch from "../../services/firebase/handlePressMatch";
import handlePressRemove from "../../services/firebase/handlePressRemove";

import getFirebaseSelf from "../../services/firebase/getFirebaseSelf";
import getEventSelf from "../../services/firebase/getEventSelf";

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      eventObj: false,
    };
  }

  _onRefresh() {
    this.setState({refreshing: true});
    getFirebaseSelf().then(
      (usr)=>{
        getEventSelf(usr.userID).then(
          (eventObj)=>{
            console.log(eventObj);
            this.setState({eventObj: eventObj, refreshing: false});
          },
          (err)=>{
            console.log(err);
            this.setState({refreshing: false});
          });
      },
      (err)=>{
        console.log(err);
        this.setState({refreshing: false});
      });
  }

  componentWillMount() {
    getFirebaseSelf().then(
      (usr)=>{
        getEventSelf(usr.userID).then(
          (eventObj)=>{
            this.setState({eventObj: eventObj});
          },
          (err)=>{
            console.log(err);
          });
      },
      (err)=>{
        console.log(err);
      });
  }


  render() {
    var temp;

    if (this.state.eventObj === false) {
      temp = (
        <View>
          <Text style={{marginLeft: 10 , padding: 10, marginTop: 20, color: "#70C1B3", fontSize: 18, textAlign: "center"}}>
              Create an event below to be discoverable by other users!
          </Text>
          <Button
            containerStyle={{marginRight: 20, marginLeft: 20, padding:10, height:45, borderRadius:10, backgroundColor: "#70C1B3"}}
            style={{fontSize: 14, color: "white"}}
            onPress={()=>{Actions.CreateEvent();}}
            title="Create Event"
            accessibilityLabel="Create Event"
          >
          Create Event
        </Button>
      </View>

      );
    }
    else {

      var eventDate = formatDate(new Date(this.state.eventObj.eventDate));
      var matchCount = getNumberOfMatches(this.state.eventObj);

      temp = (
            <View>
            <Text style={{marginLeft: 10 , padding: 10, marginTop: 20, color: "#70C1B3", fontSize: 18, textAlign: "center"}}>
                You have {matchCount} potential matches. {"\n"} Swipe through them in the Match List!
            </Text>
            <Text style={styles.title}> Event Name: </Text>
            <Text style={styles.subtitle}> {this.state.eventObj.eventName} </Text>
            <Text style={styles.title}> Event Location: </Text>
            <Text style={styles.subtitle}> {this.state.eventObj.eventLocation} </Text>
            <Text style={styles.title}> Event Date: </Text>
            <Text style={styles.subtitle}> {eventDate} </Text>
            <View style={{flex: 1, flexDirection: "row", marginTop: 20}}>
              <Button
                  containerStyle={{marginRight: 20, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
                  style={{fontSize: 14, color: "white"}}
                  onPress={()=>{Actions.editEvent({eventObj: this.state.eventObj});}}
                  accessibilityLabel="Go Back"
                >
                  Edit Event
              </Button>
              <Button
                  containerStyle={{marginRight: 20, marginLeft: 80, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
                  style={{fontSize: 14, color: "white"}}
                  onPress={()=>{Actions.matchList({eventObj: this.state.eventObj});}}
                  title={this.state.eventObj.eventName}
                  accessibilityLabel="Got to my Event"
                >
                  Match List ({matchCount})!
              </Button>
            </View>
          </View>

      );
    }


  	return (
      <ScrollView
        style = {styles.viewContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            title="Loading..."
          />}
        >
          {temp}
      </ScrollView>
  );
  }
}



function formatDate(date) {
  var nowTime = new Date();
  var dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];
  var diff = daydiff(nowTime, date);
  var hours = date.getHours();
  var hours = (hours+24-2)%24;
  var minutes = (date.getMinutes()<10?"0":"") + date.getMinutes();
  var mid="am";
  if(hours==0) //At 00 hours we need to show 12 am
    hours=12;
  else if(hours>12)
  {
    hours=hours%12;
    mid="pm";
  }

  if (diff == 0) // Today
    return "Today at " +  hours + ":" + minutes +  mid;
  else if (diff == 1) // Tomorrow
    return "Tomorrow at " + hours + ":" + minutes + mid;
  else if (diff > 7) { // Next week
    var day = date.getDay();
    return "Next "+dayNames[day]+" at " + hours + ":" + minutes + mid;
  }
  else {
    var day = date.getDay();
    return dayNames[day]+" at " + hours + ":" + minutes + mid;
  }
}

function daydiff(first, second) {
  return Math.round((second-first)/(1000*60*60*24));
}


function getNumberOfMatches(eventObj){
  count = 0;
  donecount = 0;
  console.log(eventObj.guests);
  for (var key in eventObj.guests) {
    if (eventObj.guests[key] == true){
      count++;
      donecount++;
      if (donecount == Object.keys(eventObj.guests).length){
        return count;
      }
    }
  }
}

const styles = StyleSheet.create({
  title:{
    fontSize: 20,
    marginTop: 20,
    color: "#70C1B3",
    marginLeft: 20
  },
  subtitle:{
    fontSize: 18,
    // marginTop: 20,
    color: "#000",
    marginLeft: 40
  },
  viewContainer: {
    backgroundColor: "#fff",
    ...Platform.select({ios: {top: 70},android: {top: 119}}),
  }
});

export default EventPage;
