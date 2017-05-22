import React, {Component} from "react";
import {
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Button, 
  ScrollView, 
  Alert, 
  Platform, 
  Dimensions,
  TouchableHighlight,
  TextInput,
  } from "react-native";
import firebaseApp from "../../services/firebase/firebaseService";
import getMessages from "../../services/firebase/getMessages";
import getFirebaseSelf from "../../services/firebase/getFirebaseSelf";
import getUserID from "../../services/facebook/getUserID";
import {Actions} from "react-native-router-flux";

var windowSize = Dimensions.get('window');

class ChatBox extends Component {
    constructor(props){
      super(props);
      this.state = {
        textObject: {},
        textContent: "",
        textList: [],
        user: {}
      };
    }
    componentWillMount(){
      getFirebaseSelf().then(
        (user)=>{
          this.setState({user: user});
          getMessages(user.userID).then(
            (messages)=>{
              console.log(user.userID);
              this.setState({
                textList: messages
              });
            },
            (error)=>{
              console.log(error);
            }
          );
        },
        (error)=>{
          console.log(error);
        });
    }

    onSendPress(){
      var updateObject = {};
      var textObject = this.state.textObject;
      textObject.name = this.state.user.name;
      textObject.message = this.state.textContent;
      var textArr = this.state.textList;
      textArr.push(textObject);
      this.setState({textList: textArr});
      updateObject.messages = textArr;
      getUserID().then(
        (userID)=>{
          var eventRef = firebaseApp().database().ref("Events/" + userID);
          eventRef.update(updateObject).then(
            (val) => {
              console.log("Successfully sent the message");
            },
            (err) => {
              console.log(err);
              reject(err);
            });
        })
      this.setState({message: {}});
    }

    onBackPress(){
      Actions.pop();
    }

    render(){
      var list = this.state.textList.map((item, index) => {
        console.log(item);
        return (
          <View
            style={styles.messageContainer}
            key={index}
            >
            <Text style={styles.messageLabel}> : {item.message}</Text>
          </View>
        );
      });

      return(
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <TouchableHighlight
              underlayColor={'#4e4273'}
              onPress={this.onBackPress}
              style={{marginLeft: 15}}
              >
              <Text style={{color: '#fff'}}>&lt; Back</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.chatContainer}>
            <ScrollView
              ref={(c) => this._scrollView = c}
              onScroll={this.handleScroll}
              scrollEventThrottle={16}
              onContentSizeChange={(e) => {}}
            >
            {list}
            </ScrollView>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.textContainer}>
              <TextInput
                style={styles.input}
                value={this.state.message}
                onChangeText={(text) => this.setState({textContent: text})}
                />
            </View>
            <View style={styles.sendContainer}>
              <TouchableHighlight
                underlayColor={'#4e4273'}
                onPress={() => this.onSendPress()}
                >
                <Text style={styles.sendLabel}>SEND</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    }
}

export default ChatBox;


var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#ffffff'
    },
    topContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#70C1B3',
      paddingTop: 20,
    },
    chatContainer: {
      flex: 11,
      justifyContent: 'center',
      alignItems: 'stretch'
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#70C1B3'
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    sendContainer: {
      justifyContent: 'flex-end',
      paddingRight: 10
    },
    sendLabel: {
      color: '#ffffff',
      fontSize: 15
    },
    input: {
      width: windowSize.width - 70,
      color: '#555555',
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 5,
      height: 32,
      borderColor: '#70C1B3',
      borderWidth: 1,
      borderRadius: 2,
      alignSelf: 'center',
      backgroundColor: '#ffffff'
    },
    messageContainer:{
      margin: 10,
      paddingTop: 5,
      paddingBottom: 5
    }
  });
