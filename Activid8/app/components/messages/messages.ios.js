import React, {Component} from "react";
import {StyleSheet, Text, View, Image, Button, ScrollView, Alert, Platform} from "react-native";
// import firebaseApp from "../../services/firebase/firebaseService";
// import {Actions} from "react-native-router-flux";

class Messages extends Component {
  	constructor(props){
  		super(props);
  	}

  	render(){
  		return(
  			<View style = {styles.viewContainer}>
  			<Text> Work in progress.. </Text>
  			</View>
  		);
  	}
}

export default Messages;


const styles = StyleSheet.create({
  viewContainer: {
    ...Platform.select({ios: {top: 129},android: {top: 119}}),
  },
});
