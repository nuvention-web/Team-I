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
  KeyboardAvoidingView,
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
        (self)=>{
          this.setState({
            user: self
          });
        },
        (error)=>{
          console.log(error);
        }
      );
      getMessages(this.props.guest.chatID).then(
        (messages)=>{
          this.setState({
            textList: messages
          });
        },
        (error)=>{
          console.log(error);
        }
      );
    }

    onSendPress(){
      if(this.state.message !== undefined && this.state.message !== ""){
        console.log(this.state.message);
        var updateObject = {};
        var textObject = {};
        var date = new Date();
        textObject.userID = this.state.user.userID;
        textObject.name = this.state.user.name;
        textObject.message = this.state.message;
        textObject.time = date.toString();
        var textArr = this.state.textList;
        textArr.push(textObject);
        this.setState({
          textList: textArr,
          message: ""});
        updateObject.messages = textArr;
        var chatRef = firebaseApp().database().ref("Chats/" + this.props.guest.chatID);
        chatRef.update(updateObject).then(
          (val) => {
            console.log("Successfully sent the message");
          },
          (err) => {
            console.log(err);
            reject(err);
        });
      }
    }

    onBackPress(){
      Actions.pop();
    }

    render(){
      var list = this.state.textList.map((item, index) => {
        if(item.userID === this.state.user.userID){
          return (
            <View
              style={styles.messageContainerSelf}
              key={index}
              >
              <Text style={styles.textSelf}> {item.message}</Text>
              <Text style={styles.textTime}> {item.time}</Text>
            </View>
          );          
        }
        else{
          return (
            <View
              style={styles.messageContainerOther}
              key={index}
              >
              <Text style={styles.textOther}> {item.message}</Text>
              <Text style={styles.textTime}> {item.time}</Text>
            </View>
          ); 
        }

      });

      return(
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <TouchableHighlight
              underlayColor={'#4e4273'}
              onPress={this.onBackPress}
              style={{marginLeft: 15}}
              >
              <View>
                <Text style={{color: '#fff', fontSize: 30}}>&larr; </Text>
              </View>
            </TouchableHighlight>
            <Text style={styles.guestName}> {this.props.guest.name}</Text>
          </View>
          <View style={styles.chatContainer}>
            <ScrollView
              style={{flex:1}}
              ref={(c) => this._scrollView = c}
              onScroll={this.handleScroll}
              scrollEventThrottle={16}
              onContentSizeChange={(e) => {}}
            >
            {list}
            </ScrollView>
          </View>
          <View style={styles.inputContainer}>
            <KeyboardAvoidingView
              style={styles.textContainer}>
              <TextInput
                style={styles.input}
                value={this.state.message}
                multiline={true}
                onChangeText={(text) => this.setState({message: text})}
                />
            </KeyboardAvoidingView>
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
    textSelf:{
      color: 'white',
      fontSize: 15,
    },
    textOther:{
      color: 'white',
      fontSize: 15,
    },
    textTime:{
      fontSize: 8,
    },
    topContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#70C1B3',
      paddingTop: 5,
      marginBottom: 10,
    },
    guestName:{
      color: '#ffffff',
      fontWeight: '300',
      fontSize: 15,
      paddingLeft: 30,
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
    messageContainerSelf:{
      marginTop: 2,
      marginBottom: 8,
      marginLeft: 10,
      marginRight: 10,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 13,
      paddingRight: 13,

      width: windowSize.width - (windowSize.width * .25),
      alignSelf: 'flex-end',
      justifyContent: 'center',
      backgroundColor: '#70C1B3',
      borderRadius: 5,
    },
    messageContainerOther:{
      marginTop: 2,
      marginBottom: 8,
      marginLeft: 10,
      marginRight: 10,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 13,
      paddingRight: 13,

      width: windowSize.width - (windowSize.width * .25),
      alignSelf: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#277F72',
      borderRadius: 5,
    }
  });
