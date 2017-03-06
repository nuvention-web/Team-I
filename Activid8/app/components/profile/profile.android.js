// app/components/Profile.ios.js

import React, { Component, PropTypes } from "react";
import { View, Alert, Text, StyleSheet, Button } from "react-native";
import CreateEvent from "../createEvent/createEvent";


const onButtonPress = (el) => {
  this.setState({page:"createEvent"});
  Alert.alert(this.state.page);

  // this.state.page = "aaaaa";
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "profile"
    };
  }
  render() {
    // console.log(this.state);
    var temp = (<Text>State: {this.state.page} does not have handler</Text>);
    if (this.state.page == "profile") temp =
      (<View>
          <Text>Profile Component</Text>
          <Button
          onPress={()=>this.setState({page:"createEvent"})}
          title="Create Event"
          accessibilityLabel="Create Event"
        />
        </View>);
    if (this.state.page == "createEvent"){ temp = (<CreateEvent/>);}

    return (
      <View>
        {temp}
      </View>
    );
  }
}

Profile.propTypes = {
  navigator: PropTypes.object.isRequired
};

export default Profile;
