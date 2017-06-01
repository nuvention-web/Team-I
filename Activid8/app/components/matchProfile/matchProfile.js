// app/components/Profile.ios.js

import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Platform, RefreshControl} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import Login from "../login/login";
import getFirebaseUser from "../../services/firebase/getFirebaseUser";
import handlePressMatch from "../../services/firebase/handlePressMatch";

class matchProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      userID: false,
      userObj: {name: "", bio: "", "picture": "http://us.kronospan-express.com/public/thumbs/600x600/decors/kronodesign/color/8100_600x600_crop_478b24840a.jpg", age: ""} //default
    };
  }

  _onRefresh() {
    this.setState({refreshing: true});
    getFirebaseUser(this.props.userID).then(
      (usr)=>{
        this.setState({userObj: usr, refreshing: false});
      },
      (err)=>{
        console.log(err);
        this.setState({refreshing: false});
      });
  }


  componentWillMount() {
    getFirebaseUser(this.props.userID).then(
      (usr)=>{
        this.setState({userObj: usr});
      },
      (err)=>{
        console.log(err);
      });
  }

  pressMatch (matchID){
    handlePressMatch(matchID).then(
      (val)=> {
        console.log(val);
        Actions.pop({popNum: 2});
        setTimeout(()=>{
          Actions.messaging();
        });
      },
      (err)=>{
        console.log(err);
      }
    );
  }


  render() {
    var match, message;
    if (this.props.match){
      match = (
         <Button
            containerStyle={{marginRight: 20, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
            style={{fontSize: 14, color: "white"}}
            onPress={() => {this.pressMatch(this.state.userObj.userID);}}
            accessibilityLabel="Match"
          >
            Match with {this.state.userObj.name}
        </Button>);
    }
    if (this.props.message){
      message = (
         <Button
            containerStyle={{marginRight: 20, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
            style={{fontSize: 14, color: "white"}}
            onPress={() => {Actions.messaging();}}
            accessibilityLabel="Message"
          >
            Message {this.state.userObj.name} now!
        </Button>);
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
                onPress={()=>{Actions.pop();}}
                accessibilityLabel="Back"
              >
                Back
            </Button>
            {match}
            {message}
          </View>
     </ScrollView>
    );
  }
}

export default matchProfile;


matchProfile.propTypes = {
  userID: React.PropTypes.string.isRequired,
  match: React.PropTypes.bool.isRequired,
  message: React.PropTypes.bool.isRequired,
};

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
    ...Platform.select({ios: {top: 129},android: {top: 119}}),
  }
});
