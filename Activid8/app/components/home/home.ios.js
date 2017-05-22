import React, {Component} from "react";
import {StyleSheet, Text, View, Image, ScrollView, Alert, Platform} from "react-native";
import SwipeCards from "react-native-swipe-cards";
import Card from "../card/card";
import getEventCards from "../../services/firebase/getEventCards";
import handleSwipeRight from "../../services/firebase/handleSwipeRight";
import handleSwipeLeft from "../../services/firebase/handleSwipeLeft";
import NoMoreCards from "../card/nomorecards";
import {Actions} from "react-native-router-flux";
import Button from "react-native-button";


var swipedCards = [];
var Cards = [];
var userRef;
const Home = React.createClass({
  getInitialState(){
    return{
      cardsLoading: true,
    };
  },

  componentWillMount() {
    getEventCards().then((Cards)=>{
      console.log(Cards);
      this.setState({
        cardsLoading: false,
        cards: Cards,
        outOfCards: false
      });
    }, (err)=> {console.log(err);});
  },

  handleYup (card) {
    var swipedCard = Cards.shift();
    swipedCards.push(swipedCard);

    handleSwipeRight(card.host).then(
      (val)=>{
        console.log(val);
        Alert.alert("The user has been notified.");
      },
      (err)=> {console.log(err);}
    );
  },

  handleNope (card) {
    var swipedCard = Cards.shift();

    handleSwipeLeft(card.host).then(
      (val)=>{
        console.log(val);
        // Alert.alert("Swip.");
      },
      (err)=> {console.log(err);}
    );
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
        <View style={styles.swipecontainer}>
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
        <View>
        {/* <View style={{flex: 1, flexDirection: "row", alignItems: "center", marginTop: 30}}> */}
          {/* <Button
              containerStyle={{width: 70, marginRight: 25, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#c1707e"}}
              style={{fontSize: 14, color: "white"}}
              onPress={() => {console.log("aaa");}}
              accessibilityLabel="Nope">
            Swipe
          </Button>
          <Button
              containerStyle={{width: 70, marginLeft: 150, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70c18b"}}
              style={{fontSize: 14, color: "white"}}
              onPress={() => {console.log("aaa");}}
              accessibilityLabel="Yup">
            Yup
          </Button> */}
          <Text style={{marginLeft: 10 , padding: 10, marginTop: 20, color: "#70C1B3", fontSize: 18, textAlign: "center"}}>
              Swipe right you are interested!{"\n"}
              Left to pass.
          </Text>
        </View>
        </View>

      );
    }
  }
});

const styles = StyleSheet.create({
  swipecontainer:{
    backgroundColor:"#fff",
    width:350,
    height: 450,
  },
  container:{
    ...Platform.select({ios: {top: 100},android: {top: 69}})
  },

});


export default Home;
