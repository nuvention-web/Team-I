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

  onBackPress(){
    Actions.pop();
  }


  render() {
    return (
      <View style = {styles.container}>
        <View style={styles.topContainer}>
            <TouchableHighlight
              underlayColor={'#4e4273'}
              onPress={this.onBackPress}
              style={{marginLeft: 15}}
              >
              <View>
                <Text style={{color: '#fff', fontSize: 30}}>&larr; </Text>
              </View>
            </TouchableHighlight>
            <Text style={styles.guestName}> {this.props.guest.name}</Text>
          </View>
        <View style={styles.infoContainer}>
          <Image style={styles.picture} source={{uri: this.props.guest.picture}}/>
          <Text style={styles.guestName}>{this.props.guest.name}</Text>
          <Text style={styles.eventName}>{this.state.eventName}</Text>
          <Text style={styles.eventLocation}>{this.state.eventLocation}</Text>
          <Text style={styles.eventDate}>{this.state.eventDate}</Text>
        </View>
      </View>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: '#ffffff'
  },
  topContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#70C1B3',
      paddingTop: 5,
      marginBottom: 10,
      height: 50,
  },
  infoContainer:{
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  picture: {
    marginTop: 60,
    marginBottom: 10,
    width: 200,
    height: 200,
  },
  guestName:{
    color: '#70C1B3',
    fontWeight: '500',
    fontSize: 20,
  },
  eventName:{
    fontSize: 18,
  },
  eventDate:{
    fontSize: 16,
  },
  eventLocation:{
    fontSize: 16,
  },
});

export default EventDetails;
