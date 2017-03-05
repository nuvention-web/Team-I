// app/components/Profile.ios.js

import React, { Component, PropTypes } from "react";
import { View, Text, StyleSheet, Button, Image, ScrollView } from "react-native";
import CreateEvent from "../createEvent/createEvent";

class Profile extends Component {

  render() {
    const ryanMain = require("../../imgs/ryanIcon.jpg");
    const ryan1 = require("../../imgs/ryan1.jpg");
    const ryan2 = require("../../imgs/ryan2.jpg");
    // console.log(this.props);

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
          <Button
              style={styles.eventButton}
              onPress={()=>this.props.navigator.push({name: "CreateEvent"})}
              title="Create Event"
              accessibilityLabel="Create Event"
            />
     </ScrollView>
    );
  }
}

Profile.propTypes = {
  navigator: PropTypes.object.isRequired
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
    color: "crimson",
    marginLeft: 20
  },
  eventButton: {
    // marginTop:100
  }

});
