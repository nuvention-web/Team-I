'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  View,
  DatePickerAndroid,
  TimePickerAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Button
} = ReactNative;


class createEvent extends React.Component {
  static title = 'DatePickerAndroid';
  static description = 'Standard Android date picker dialog';

  state = {
    dateText: 'Click to pick a date',
    timeText: 'Click to pick a time',
  };

  showDatePicker = async (stateKey, options) => {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState['dateText'] = 'Click to pick a time';
      } else {
        var date = new Date(year, month, day);
        newState['dateText'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };


  showTimePicker = async (stateKey, options) => {
    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      var newState = {};
      if (action === TimePickerAndroid.timeSetAction) {
        newState['timeText'] = _formatTime(hour, minute);
        newState[stateKey + 'Hour'] = hour;
        newState[stateKey + 'Minute'] = minute;
      } else if (action === TimePickerAndroid.dismissedAction) {
        newState['timeText'] = 'Click to pick a time';
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };
  
  updateEventLocationText = (text) => {
    if (!text) return;
    this.setState((state) => {
      return {
        eventLocation: text
      };
    });
  };

  updateEventNameText = (text) => {
    if (!text) return;
    this.setState((state) => {
      return {
        eventName: text
      };
    });
  };

  render() {
    return (
      <View>
        <Text>Create an Event</Text>

        {/*Text Input of the user's event*/}
        <View title="Title">
          <TextInput
           autoCapitalize="none"
           placeholder="My Event Name"
           onChange={(event) => this.updateEventNameText(event.nativeEvent.text)}
           style={styles.default}
        />

        {/*Text Input of the Location*/}
        <TextInput
            autoCapitalize="none"
            placeholder="My Event Location"
            autoCorrect={false}
            onChange={(event) => this.updateEventLocationText(event.nativeEvent.text)}
            style={styles.default}
          />

        {/*Sets Time/Date*/}
        <Text>Pick a date</Text>
        <TouchableWithoutFeedback
          onPress={this.showDatePicker.bind(this, 'min', {
            date: this.state.minDate,
            minDate: new Date(),
          })}>
          <Text style={styles.text}>{this.state.dateText}</Text>
        </TouchableWithoutFeedback>
        <Text>Pick a time</Text>
        <TouchableWithoutFeedback
          onPress={this.showTimePicker.bind(this, 'simple', {})}>
          <Text style={styles.text}>{this.state.timeText}</Text>
        </TouchableWithoutFeedback>


        {/*Create Event Button*/}
        <Button
          onPress={this.onButtonPress}
          title="Create Event"
          accessibilityLabel="Create Event"
        />
        </View>
      </View>
    );
  }
}

{/*TODO: Instead of the 24-hour format, make it include AM/PM*/}
function _formatTime(hour, minute) {
  return hour + ':' + (minute < 10 ? '0' + minute : minute);
}

var styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});

module.exports = createEvent;
