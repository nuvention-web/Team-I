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
    if(this.state.expanded){
      return (
          <ScrollView>
            <Image style={styles.thumbnail} source={{uri: this.props.image}} />
            <Text style = {styles.detailText}>Name: {this.props.name}</Text>
            <Text style = {styles.detailText}>Age: {this.props.age} </Text>
            <Text style = {styles.detailText}>Bio: {this.props.bio} </Text>
            <Text style = {styles.detailText}>Event: {this.props.eventTitle}</Text>
            <Text style = {styles.detailText}>Event Location: {this.props.eventLocation}</Text>
            <Text style = {styles.detailText}>Event Date: {this.props.eventDate}</Text>
            <Button
                onPress={this.expandCard}
                title="Go back"
                color="#FF8900"
                accessibilityLabel="Learn more about this event"
              />
            </ScrollView>
        );
    }
    else{
      return (
          <View style={styles.card}>
            <Image style={styles.thumbnail} source={{uri: this.props.image}} />
            <Text style={styles.text}>{this.props.name}, {this.props.age}</Text>
            <Text style={styles.titleText}> {this.props.eventTitle}</Text>
            <Button
                onPress={this.expandCard}
                title="Details"
                color="#FF8900"
                accessibilityLabel="Learn more about this event"/>
            </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 400,
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
    height: 800,
    alignItems: "center",
    borderRadius: 5,
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 1,
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
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
    justifyContent: "center"
  },
});


export default Card;
