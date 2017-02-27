// app/components/CreateEvent.ios.js

import React, { Component } from "react";
import { View, Alert, Text, StyleSheet, Button, DatePickerIOS, TextInput } from "react-native";


const SubmitButtonHandler = (date, name, location) => {
  console.log(date);
  console.log(name);
  console.log(location);
}


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
    //SEND AS EVENT OBJECT TO FIREBASE:
    // ADD HERE

    Alert.alert(this.state.eventName);
  };


  render() {
    // console.log(this.state);

    return (
      <View style={styles.fullView}>
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
          date={this.state.date}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />
        <WithLabel label="Value:">
          <Text>{
            this.state.date.toLocaleDateString() +
            " " +
            this.state.date.toLocaleTimeString()
          }</Text>
        </WithLabel>
        <Button
          onPress={this.onButtonPress}
          title="Create Event"
          accessibilityLabel="Create Event"
        />
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
    width: 300
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
    color: "#f23c33"
  }
});
