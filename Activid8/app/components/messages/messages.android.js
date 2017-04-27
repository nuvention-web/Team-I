import React, {Component} from "react";
import {StyleSheet, Text, View, Image, Button, ScrollView, Alert, Platform} from "react-native";
import firebaseApp from "../../services/firebase/firebaseService";
import {Actions} from "react-native-router-flux";

class Messages extends Component {
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

export default Messages;