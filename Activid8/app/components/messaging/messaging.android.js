import React, {Component} from "react";
import {StyleSheet, Text, View, Image, Button, ScrollView, Alert, Platform} from "react-native";
import firebaseApp from "../../services/firebase/firebaseService";
import getEvents from "../../services/firebase/getEvents";
import {Actions} from "react-native-router-flux";
import getUserID from "../../services/facebook/getUserID";

import Messages from "../messages/messages";

class Messaging extends Component {
	constructor(props){
		super(props);

	}
	render(){
		return(
			<ScrollView style = {styles.viewContainer}>
				<Text> In Messaging </Text>
			</ScrollView>
		);
	}
}

export default Messaging;

const styles = StyleSheet.create({
  viewContainer: {
    ...Platform.select({
    	ios: {top: 129},
    	android: {top: 79}
    }),
  }
});