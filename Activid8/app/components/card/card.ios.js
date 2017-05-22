import React, {Component} from "react";
import {StyleSheet, Text, View, Image, Button, ScrollView, Alert, Platform} from "react-native";
import SwipeCards from "react-native-swipe-cards";


class Card extends Component{
  constructor(props){
    super(props);
    this.state = {expanded: false};
  }

  expandCard = () => {
    this.setState(
      {expanded: !this.state.expanded}
    );
  }

  render() {

    var eventDate = formatDate(new Date(this.props.eventDate));


    if(this.state.expanded){
      return (
          <View style={styles.expandedCard}>

            <View style={{justifyContent: "center", alignItems: "center"}}>
              <Image source={{uri: this.props.image}} style={styles.mainImage}/>
            </View>
            <Text style={styles.name}>{this.props.name}, <Text style={styles.age}>{this.props.age}</Text></Text>
            <Text style={styles.time}>{eventDate}</Text>

            <Text style={styles.eventName}>Event: <Text style={{color: "#000000"}}> {this.props.eventTitle}</Text></Text>
            <Text style={styles.eventName}>Location: <Text style={{color: "#000000"}}>{this.props.eventLocation}</Text></Text>
            <Text style={styles.eventName}>Bio: </Text>


            <Text style={styles.bio}> {this.props.bio}</Text>
            <Button
                onPress={this.expandCard}
                title="Back"
                color="#70C1B3"
                accessibilityLabel="Learn more about this event"/>

          </View>
        );
    }
    else{
      return (
          <View style={styles.card}>
            <Image style={styles.thumbnail} source={{uri: this.props.image}} />
            <Text style={styles.text}>{this.props.name}, {this.props.age}</Text>
            <Text style={styles.titleText}> {this.props.eventTitle}</Text>
            <Text style={styles.timeUnderText}>{eventDate}</Text>
            <Button
                onPress={this.expandCard}
                title="Details"
                color="#70C1B3"
                accessibilityLabel="Learn more about this event"/>
            </View>
        );
    }
  }
}


function formatDate(date) {
  var nowTime = new Date();
  var dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];
  var diff = daydiff(nowTime, date);
  var hours = date.getHours();
  var hours = (hours+24-2)%24;
  var minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
  var mid='am';
  if(hours==0) //At 00 hours we need to show 12 am
    hours=12;
  else if(hours>12)
  {
  hours=hours%12;
  mid='pm';
  }

  if (diff == 0) // Today
      return "Today at " +  hours + ":" + minutes +  mid;
  else if (diff == 1) // Tomorrow
      return "Tomorrow at " + hours + ":" + minutes + mid;
  else if (diff > 7) { // Next week
    var day = date.getDay();
    return "Next "+dayNames[day-1]+" at " + hours + ":" + minutes + mid;
  }
  else {
    var day = date.getDay();
    return dayNames[day-1]+" at " + hours + ":" + minutes + mid;
  }
}

function daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}


const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 450,
    alignItems: "center",
    borderRadius: 5,
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 1,
    elevation: 1,
    paddingBottom: 10
  },
  expandedCard: {
    width: 300,
    height: 450,
    // alignItems: "center",
    // borderRadius: 5,
    // borderColor: "black",
    backgroundColor: "white",
    // borderWidth: 1,
    elevation: 1,
    paddingBottom: 10
  },

  thumbnail: {
    flex: 1,
    width: 240,
    height: 240
  },
  text: {
    fontSize: 18,
    paddingTop: 10,
    justifyContent: "center"
  },

  detailText: {
    fontSize: 14,
    paddingTop: 2,
    paddingBottom: 2
  },
  titleText: {
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 10,
    // justifyContent: "center"
  },
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
    // paddingBottom: 50
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    color: "#70C1B3",
    marginLeft: 20
  },
  time: {
    fontSize: 18,
    marginLeft: 20,
  },
  timeUnderText: {
    fontSize: 16,
    marginLeft: 20,
    color: "#70C1B3",
  },
  eventName: {
    fontSize: 18,
    color: "#70C1B3",
    marginLeft: 20
  }
});


export default Card;
