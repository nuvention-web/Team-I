// app/components/CreateEvent.ios.js

import React, { Component, PropTypes } from "react";
import { View, Alert, Text, StyleSheet, Button, DatePickerIOS, TextInput, Platform} from "react-native";
import sendEvent from "../../services/firebase/sendEvent";
import {Actions} from "react-native-router-flux";


class editProfile extends Component {


  render() {
    // console.log(this.state);
    console.log(this.props);

    return (
      <View style = {styles.viewContainer}>
        <Text style={styles.title}> Profile and Settings</Text>

        <Button
          onPress={()=>{Actions.pop();}}
          title="Go Back"
          accessibilityLabel="Go Back"
        />
      </View>
    );
  }
}

export default editProfile;

var styles = StyleSheet.create({
  title : {
    fontSize: 32,
    bottom: 10,
    color: "#70C1B3"
  },
  viewContainer: {
    ...Platform.select({ios: {top: 59},android: {top: 49}}),
  }
});
