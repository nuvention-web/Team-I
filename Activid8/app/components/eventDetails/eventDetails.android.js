import React, { Component, PropTypes} from "react";
import {
  Platform, 
  AppRegistry, 
  ListView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  TouchableHighlight, 
  View, 
  Image, 
  RefreshControl
} from "react-native";
import Button from "react-native-button";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import {Actions} from "react-native-router-flux";
import getChatInfo from "../../services/firebase/getChatInfo";


class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      eventName: "",
      eventLocation: "",
      eventDate: "",
    };
  }

  componentWillMount() {
    getChatInfo(this.props.guest.chatID).then(
      (chatInfo)=>{
        this.setState({
          eventName: chatInfo.eventName,
          eventDate: chatInfo.eventDate,
          eventLocation: chatInfo.eventLocation,
        });
      });
  }


  render() {
    return (
      <ScrollView
        style = {styles.viewContainer}
        >
        <Text> {this.props.guest.name}{this.state.eventName}{this.state.eventLocation}{this.state.eventDate}</Text>
      </ScrollView>
  );
  }
}


const styles = StyleSheet.create({
  title:{
    fontSize: 20,
    marginTop: 20,
    color: "#70C1B3",
    marginLeft: 20
  },
  matchpicture: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  subtitle:{
    fontSize: 18,
    color: "#000",
    marginLeft: 40
  },
  viewContainer: {
    backgroundColor: "#fff",
    ...Platform.select({ios: {top: 70},android: {top: 39}}),
  }
});

export default EventDetails;
