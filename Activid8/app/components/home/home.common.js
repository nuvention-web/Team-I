import React, {Component} from "react";
import {StyleSheet, Text, View, Image, Button, ScrollView, Platform} from "react-native";
import SwipeCards from "react-native-swipe-cards";
import firebaseApp from "../../services/firebase/firebaseService";

const ref = firebaseApp().database().ref("Events");

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
	        	<Text style = {styles.detailText}>Event Details: This will have details about the event</Text>
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

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    );
  }
});



var Cards = [];
var Cards2 = [
  {name: "10", image: "https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif"},
  {name: "11", image: "https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif"},
  {name: "12", image: "https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif"},
  {name: "13", image: "https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif"},
];

const Home = React.createClass({
    getInitialState(){
      return{
        cardsLoading: true,
      }
    },

    componentWillMount() {
      var numPushed = 0;
      ref.on('value', (dataSnapshot) => {
        dataSnapshot.forEach((child) => {
          Cards.push({
            name: child.val().name,
            age: child.val().age,
            bio: child.val().bio,
            eventTitle: child.val().eventName,
            image: child.val().img,
          });
          numPushed++;
        });
        this.setState({
          cardsLoading: false,
          cards: Cards,
          outOfCards: false
        });
        console.log(numPushed);

      });
    },

  	cardRemoved (index) {
    	console.log("The index is {index}");

    let CARD_REFRESH_LIMIT = 3;

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log("There are only {this.state.cards.length - index - 1} cards left.");

      if (!this.state.outOfCards) {
        console.log("Adding {Cards2.length} more cards");

        this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        });
      }

    }

  },
  render() {
    if(this.state.cardsLoading){
      return(
        <Text>
          loading cards...
        </Text>
      )
    }
    else{
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

  noMoreCards: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container:{
    backgroundColor:"#fff",
    width:350,
    height: 450,
		...Platform.select({ios: {top: 129},android: {top: 119}})
  },
});


export default Home;
