import React, {Component} from "react";
import {StyleSheet, Text, View, Image, Button, ScrollView, Alert, Platform} from "react-native";
import SwipeCards from "react-native-swipe-cards";
import firebaseApp from "../../services/firebase/firebaseService";
import getEvents from "../../services/firebase/getEvents";
import Card from "../card/card";
import NoMoreCards from "../card/nomorecards";
import {Actions} from "react-native-router-flux";
import getUserID from "../../services/facebook/getUserID";

var swipedCards = [];
var Cards = []
var userRef;
const Home = React.createClass({
  getInitialState(){
    return{
      cardsLoading: true,
    };
  },

  componentWillMount() {
    Cards = [];
    //var Cards2 = [];
    getUserID().then((userID)=>{
      this.setState({
        ID: userID,
      });
    });
    const eventRef = firebaseApp().database().ref("Events");
    userRef = firebaseApp().database().ref("Users/" + this.state.ID);
    console.log(userRef);
    var numPushed = 0;
    
    eventRef.on("value", (dataSnapshot) => {
      dataSnapshot.forEach((child) => {
        var card = {};
        var cardOwnerRef = firebaseApp().database().ref("Users/" + child.val().host);
        console.log(child.val().host);
        card.eventTitle = child.val().eventName;
        card.eventLocation = child.val().eventLocation;
        card.host = child.val().host;
        card.eventDate = child.val().eventDate;
        cardOwnerRef.on("value", (ownerSnapshot) => {
          card.name = ownerSnapshot.val().name;
          card.image = ownerSnapshot.val().picture;
        });
        Cards.push(card);
        numPushed++;
      });
    });
    this.setState({
      cardsLoading: false,
      cards: Cards,
      outOfCards: false
    });
  },

  handleYup (card) {
    var swipedCard = Cards.shift();
    swipedCards.push(swipedCard);

    var tmp = {};
    tmp.swipedCards = swipedCards;
    userRef.update(tmp);

    var eventRef = firebaseApp().database().ref("Events/" + card.host);
    var eventTemp = {};
    var guests = [];

    guests.push(this.state.ID);
    eventTemp.guests = guests;
    eventRef.update(eventTemp);

    console.log("Events/" + card.host);

    Alert.alert("The user has been notified.");

  },

  handleNope (card) {
    var swipedCard = Cards.shift();
    //console.log("Swiped No and: " + Cards);

  },
/*
  cardRemoved (index) {
    //console.log("The index is {index}");

    let CARD_REFRESH_LIMIT = 3;

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      //console.log("There are only {this.state.cards.length - index - 1} cards left.");

      if (!this.state.outOfCards) {
        //console.log("Adding {Cards2.length} more cards");

        this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        });
      }
    }
  },
*/
  render() {
    //console.log("IN HOME COMPONENT");
    if(this.state.cardsLoading){
      return(
        <View style={styles.container}>
          <Text>
            loading cards...
          </Text>
  			</View>
      );
    }
    else{
      //console.log("Rendering: " + Cards);
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
  }
});

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff",
    width:350,
    height: 450,
    ...Platform.select({ios: {top: 129},android: {top: 69}})
  },
});


export default Home;
