// app/components/home.android.js /// NOT TESTED

import React, {Component} from "react";
import {StyleSheet, Text, View, Image, Alert, Button, ScrollView} from "react-native";
import SwipeCards from "react-native-swipe-cards";
// import reactMixin from "react-mixin";
// import HomeCommon from "./home.common";

/*
TODO: Create a button to expand a card
*/


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
            <Text>Name: {this.props.name}</Text>
            <Text>Age: {this.props.age} </Text>
            <Text>Bio: {this.props.bio} </Text>
            <Text>Event: {this.props.eventTitle}</Text>
            <Text>Event Details: This will have details about the event</Text>
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
            <Text style={styles.text}> {this.props.eventTitle}</Text>
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

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    );
  }
});

const Cards = [
  {name: "Neil", age: "58", bio: "Scientist. Smart.", eventTitle: "Want to go to the planetarium?", image: "http://i.imgur.com/GuAB8OE.jpg"},
  {name: "Greg", age: "32", bio: "Hi", eventTitle: "Going to watch La La Land before it's out of the theater", image: "http://i.imgur.com/6ePfo5i.jpg"},
  {name: "Bryan", age: "21", bio: "Nose looks like someone twerking.", eventTitle: "Anyone wanna hit up Chipotle?", image: "http://i.imgur.com/VtmB3LX.jpg"},
  {name: "Cynthia", age: "27", bio: "A New York artist", eventTitle:"Field Museum free weekend - who's in?", image: "http://www.newwaytoship.com/wp-content/uploads/2015/02/banner-person-maria.png"},
  {name: "5", image: "https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif"},
  {name: "6", image: "https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif"},
  {name: "7", image: "https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif"},
  {name: "8", image: "https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif"},
  {name: "9", image: "https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif"},
];

const Cards2 = [
  {name: "10", image: "https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif"},
  {name: "11", image: "https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif"},
  {name: "12", image: "https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif"},
  {name: "13", image: "https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif"},
];



const Home = React.createClass({
    getInitialState() {
      return {
          cards: Cards,
          outOfCards: false
      };
    },
    handleYup (card) {
      console.log("yup");
    },
    handleNope (card) {
      console.log("nope");
    },
    cardRemoved (index) {
      console.log("The index is ${index}");

    let CARD_REFRESH_LIMIT = 3;

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log("There are only ${this.state.cards.length - index - 1} cards left.");

      if (!this.state.outOfCards) {
        console.log("Adding ${Cards2.length} more cards");

        this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        });
      }

    }

  },
  render() {
    return (
      <View style={styles.container}>
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved}
      />
    </View>
    );
  }
});

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 400,
    alignItems: "center",
    borderRadius: 5,
    // overflow: "hidden",
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
    // overflow: "hidden",
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
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },


  noMoreCards: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container:{
    backgroundColor:"#fff",
    width:300,
    height: 400
  },
});


export default Home;
