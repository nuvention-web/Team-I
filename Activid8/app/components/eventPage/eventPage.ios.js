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
          <Button
              containerStyle={{marginRight: 20, marginTop: 10, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
              style={{fontSize: 14, color: "white"}}
              // onPress={()=>{Actions.pop();}}
              accessibilityLabel="Go Back"
            >
              Edit Event
          </Button>
          <Button
              containerStyle={{marginRight: 20, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
              style={{fontSize: 14, color: "white"}}
              onPress={()=>{Actions.matchList({eventObj: this.state.eventObj});}}
              title={this.state.eventObj.eventName}
              accessibilityLabel="Got to my Event"
            >
              Match List
            </Button>
         </ScrollView>
  );
  }
}


const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "#fff",
    ...Platform.select({ios: {top: 100},android: {top: 119}}),
  }
});

export default EventPage;

EventPage.propTypes = {
  // eventObj: React.PropTypes.object.isRequired,
};
