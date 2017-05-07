import React, {Component} from "react";
import {StyleSheet, Text, View, Image, Button, ScrollView, Alert, Platform} from "react-native";
import firebaseApp from "../../services/firebase/firebaseService";
import getEvents from "../../services/firebase/getEvents";
import {Actions} from "react-native-router-flux";
import getUserID from "../../services/facebook/getUserID";

import Messages from "../messages/messages";

class MessagingListView extends Component {
	constructor(props){
		super(props);

	}
	render(){
		return(
			<View>
				<Text> In Messaging </Text>
			</View>
		);
	}
}

export default MessagingListView;

const styles = StyleSheet.create({
  viewContainer: {
    ...Platform.select({
    	ios: {top: 129},
    	android: {top: 79}
    }),
  }
});