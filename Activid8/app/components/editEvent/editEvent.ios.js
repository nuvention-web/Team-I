// app/components/CreateEvent.ios.js

import React, { Component, PropTypes } from "react";
import { View, Alert, Text, StyleSheet, Picker, TextInput, Platform, TouchableWithoutFeedback, Keyboard, DatePickerIOS} from "react-native";
import sendEvent from "../../services/firebase/sendEvent";
import {Actions} from "react-native-router-flux";
import Button from "react-native-button";
import saveFirebaseEvent from "../../services/firebase/saveFirebaseEvent";

class EditEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      eventName: this.props.eventObj.eventName,
      eventDate: this.props.eventObj.eventDate,
      eventLocation: this.props.eventObj.eventLocation,
    };
  }

  onDateChange = (date) => {
    this.setState({eventDate: date});
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

  render() {

    var eventDate = new Date(this.state.eventDate);

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {styles.viewContainer}>
          <Text style={styles.title}> Edit Event</Text>
          <WithLabel label="What?*">
            <TextInput
              autoCapitalize="none"
              placeholder={this.state.eventName}
              autoCorrect={false}
              onChange={(event) => this.updateEventNameText(event.nativeEvent.text)}
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="Where?*">
            <TextInput
              autoCapitalize="none"
              placeholder={this.state.eventLocation}
              autoCorrect={false}
              onChange={(event) => this.updateEventLocationText(event.nativeEvent.text)}
              style={styles.default}
            />
          </WithLabel>
          <Heading label="When?*  " />
          <DatePickerIOS
            minimumDate= {new Date()}
            date={eventDate}
            mode="datetime"
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange}
          />

          <View style={{flex: 1, flexDirection: "row", marginTop: 20}}>
            <Button
                containerStyle={{marginRight: 20, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
                style={{fontSize: 14, color: "white"}}
                onPress={()=>{Actions.pop();}}
                accessibilityLabel="Go Back"
              >
                Back
            </Button>

            <Button
                containerStyle={{marginRight: 20, marginLeft: 80, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
                style={{fontSize: 14, color: "white"}}
                onPress={()=>{
                  var eventObj = {};
                  eventObj.eventName = this.state.eventName;
                  eventObj.eventDate = this.state.eventDate;
                  eventObj.eventLocation = this.state.eventLocation;
                  saveFirebaseEvent(eventObj).then((val)=>{
                    console.log("Successfully updated user");
                    Actions.pop({ refresh: { refreshing: true }});
                  }, (err)=> {console.log(err);});
                }}
                accessibilityLabel="Save Changes"
              >
                Save Changes
            </Button>

          </View>

          <Button
              containerStyle={{marginTop: 65, marginRight: 20, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#c1707e"}}
              style={{fontSize: 14, color: "white"}}
              onPress={()=>{Actions.pop();}}
              title="Delete Event"
              accessibilityLabel="Delete Event"
            >
              Delete Event
          </Button>

        </View>
      </TouchableWithoutFeedback>

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


export default EditEvent;

EditEvent.propTypes = {
  eventObj: React.PropTypes.object.isRequired,
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
    fontWeight: '500',
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
  viewContainer: {
    marginLeft: 20,
    ...Platform.select({ios: {top: 59},android: {top: 49}}),
  }
});
