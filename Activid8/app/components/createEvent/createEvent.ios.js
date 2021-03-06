// app/components/CreateEvent.ios.js

import React, { Component, PropTypes } from "react";
import { View, Alert, Text, StyleSheet, DatePickerIOS, TextInput, Platform} from "react-native";
import Button from "react-native-button";
import sendEvent from "../../services/firebase/sendEvent";
import {Actions} from "react-native-router-flux";


class CreateEvent extends Component {

  static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  };

  state = {
    date: this.props.date,
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
    eventName: "none",
    eventLocation: "none",
  };

  onDateChange = (date) => {
    this.setState({date: date});
  };

  onTimezoneChange = (event) => {
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({timeZoneOffsetInHours: offset});
  };

  updateEventNameText = (text) => {
    if (!text) return;
    this.setState((state) => {
      return {
        eventName: text
      };
    });
  };

  updateEventLocationText = (text) => {
    if (!text) return;
    this.setState((state) => {
      return {
        eventLocation: text
      };
    });
  };

  onButtonPress = () => {
    console.log(this.props);
    if(this.state.eventName === 'none'){
      Alert.alert("Please enter your Event's name");
    }
    else if(this.state.eventLocation === 'none'){
      Alert.alert("Please enter your Event's location");
    }
    else{

      sendEvent(this.state.eventName, this.state.eventLocation, this.state.date.toString())
      Alert.alert("Submitted Event");
      // this.props.route.getEvent(this.state.eventName);
      console.log(this.state.eventName)
      // this.props.navigator.pop();
      // Actions.
    }
  };


  render() {
    // console.log(this.state);
    console.log(this.props);

    return (
      <View style = {styles.viewContainer}>
        <Text style={styles.title}> Create Event</Text>
        <WithLabel label="What?*">
          <TextInput
            autoCapitalize="none"
            placeholder="My Event Name"
            autoCorrect={false}
            onChange={(event) => this.updateEventNameText(event.nativeEvent.text)}
            style={styles.default}
          />
        </WithLabel>
        <WithLabel label="Where?*">
          <TextInput
            autoCapitalize="none"
            placeholder="My Event Location"
            autoCorrect={false}
            onChange={(event) => this.updateEventLocationText(event.nativeEvent.text)}
            style={styles.default}
          />
        </WithLabel>
        <Heading label="When?*  " />
        <DatePickerIOS
          minimumDate= {new Date()}
          date={this.state.date}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />

        <Button
          containerStyle={{marginRight: 20, marginLeft: 20, padding:10, height:45, borderRadius:10, backgroundColor: "#70C1B3"}}
          style={{fontSize: 14, color: "white"}}
          onPress={this.onButtonPress}
          title="Create Event"
          accessibilityLabel="Create Event"
        >
        Create Event
        </Button>

        <Button
          containerStyle={{marginRight: 20, marginTop:20, marginLeft: 20, padding:10, height:45, borderRadius:10, backgroundColor: "#70C1B3"}}
          style={{fontSize: 14, color: "white"}}
          onPress={()=>{Actions.pop();}}
          title="Go Back"
          accessibilityLabel="Go Back"
        >
        Go Back
        </Button>

      </View>
    );
  }
}


class WithLabel extends React.Component {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.labelView}>
          <Text style={styles.label}>
            {this.props.label}
          </Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

class Heading extends React.Component {
  render() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.label}>
          {this.props.label}
        </Text>
      </View>
    );
  }
}

//CreateEvent.propTypes = {
  //navigator: PropTypes.object.isRequired
//};

export default CreateEvent;



var styles = StyleSheet.create({
  textinput: {
    height: 26,
    width: 100,
    padding: 4,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelView: {
    marginRight: 10,
    paddingVertical: 2,
  },
  label: {
    // fontWeight: '500',
    fontSize: 16,
    paddingLeft: 20,
  },
  headingContainer: {
    paddingVertical: 6
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
  fullView: {
    width: 300,
    marginLeft: 20,
    marginTop: 20
  },
  default: {
    height: 26,
    flex: 1,
    fontSize: 13,
    padding: 4,
  },
  title : {
    fontSize: 32,
    bottom: 10,
    color: "#70C1B3"
  },
  viewContainer: {
    ...Platform.select({ios: {top: 59},android: {top: 49}}),
  }
});
