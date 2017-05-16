// app/components/Profile.ios.js

import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Platform, RefreshControl} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import Login from "../login/login";
import getFirebaseSelf from "../../services/firebase/getFirebaseSelf";

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      eventName: "none",
      refreshing: false,
      userObj: {name: "", bio: "", "picture": "http://us.kronospan-express.com/public/thumbs/600x600/decors/kronodesign/color/8100_600x600_crop_478b24840a.jpg", age: ""} //default
    };
  }

  _onRefresh() {
    this.setState({refreshing: true});
    getFirebaseSelf().then(
      (usr)=>{
        this.setState({userObj: usr, refreshing: false});
      },
      (err)=>{
        console.log(err);
        this.setState({refreshing: false});
      });
  }


  componentWillMount() {
    getFirebaseSelf().then(
      (usr)=>{
        this.setState({userObj: usr});
      },
      (err)=>{
        console.log(err);
      });
  }

  render() {

    // var
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
            <Button
                containerStyle={{marginRight: 20, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
                style={{fontSize: 14, color: "white"}}
                onPress={()=>{Actions.editProfile({userObj: this.state.userObj});}}
                accessibilityLabel="Edit Profile and Settings"
              >
                Edit Profile and Settings
            </Button>
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
    marginRight: 20,
    paddingBottom: 50
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    color: "#70C1B3",
    marginLeft: 20
  },
  viewContainer: {
    ...Platform.select({ios: {top: 100},android: {top: 119}}),
  }
});
