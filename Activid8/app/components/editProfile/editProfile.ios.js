// app/components/CreateEvent.ios.js

import React, { Component, PropTypes } from "react";
import { View, Alert, Text, StyleSheet, Picker, TextInput, Platform, TouchableWithoutFeedback, Keyboard} from "react-native";
import sendEvent from "../../services/firebase/sendEvent";
import {Actions} from "react-native-router-flux";
import Button from "react-native-button";
import saveFirebaseUser from "../../services/firebase/saveFirebaseUser";



class editProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      age: this.props.userObj.age.toString(),
      bio: this.props.userObj.bio,
      gender: this.props.userObj.gender,
      interestedIn: this.props.userObj.interestedIn
    };
  }


  saveUser = () => {
    // var userObj = JSON.parse(JSON.stringify(this.props.userObj));
    var userObj = {};
    userObj.age = this.state.age;
    userObj.bio = this.state.bio;
    userObj.gender = this.state.age;
    userObj.interestedIn = this.state.interestedIn;
    saveFirebaseUser(userObj).then((val)=>{
      console.log(val);
      console.log("Successfully updated user");
    }, (err)=> {console.log(err);});

  }

  render() {

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {styles.viewContainer}>
          <Text style={styles.title}> Profile and Settings</Text>

          <Text style={styles.header}> Age: </Text>
          <TextInput
          style={{height: 40, borderColor: "gray", borderWidth: 1, marginLeft: 20, marginRight: 20}}
          onChangeText={(age) => this.setState({age})}
          value={this.state.age}
          keyboardType={'number-pad'}
          maxLength={2}
          />

          <Text style={styles.header}> Bio: </Text>
          <TextInput
          multiline = {true}
          numberOfLines = {3}
          style={{height: 100, borderColor: "gray", borderWidth: 1, marginLeft: 20, marginRight: 20}}
          onChangeText={(bio) => this.setState({bio})}
          value={this.state.bio}
          maxLength={140}
          />

              <Text style={styles.header}> I am a: </Text>
              <Picker
                  style={styles.pickcontainer}
                  selectedValue={this.state.gender}
                  onValueChange={(gender) => this.setState({gender: gender})}>
                  <Picker.Item label="Man" value="man" />
                  <Picker.Item label="Woman" value="woman" />
              </Picker>


            <Text style={styles.header}> Interested in: </Text>
            <Picker
              style={styles.pickcontainer}
              selectedValue={this.state.interestedIn}
              onValueChange={(interestedIn) => this.setState({interestedIn: interestedIn})}>
              <Picker.Item label="Men" value="man" />
              <Picker.Item label="Women" value="woman" />
            </Picker>

          <Button
              containerStyle={{marginRight: 20, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
              style={{fontSize: 14, color: "white"}}
              onPress={()=>{
                var userObj = {};
                userObj.age = this.state.age;
                userObj.bio = this.state.bio;
                userObj.gender = this.state.gender;
                userObj.interestedIn = this.state.interestedIn;
                saveFirebaseUser(userObj).then((val)=>{
                  console.log("Successfully updated user");

                  Actions.pop({ refresh: { refreshing: true }})
                }, (err)=> {console.log(err);});
              }}
              accessibilityLabel="Save Changes"
            >
              Save Changes
          </Button>


          <Button
              containerStyle={{marginRight: 20, marginTop: 10, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
              style={{fontSize: 14, color: "white"}}
              onPress={()=>{Actions.pop();}}
              accessibilityLabel="Go Back"
            >
              Go Back
          </Button>

        </View>
      </TouchableWithoutFeedback>

    );
  }
}

export default editProfile;

editProfile.propTypes = {
  userObj: React.PropTypes.object.isRequired,
};

var styles = StyleSheet.create({
  title : {
    fontSize: 32,
    bottom: 10,
    color: "#70C1B3"
  },
  header : {
    fontSize: 16,
    color: "#70C1B3",
    padding: 10,
  },
  pickcontainer : {
    marginLeft: 20,
    width: 100,
    height: 150,
    marginTop: -75
  },
  viewContainer: {
    ...Platform.select({ios: {top: 59},android: {top: 49}}),
  }
});
