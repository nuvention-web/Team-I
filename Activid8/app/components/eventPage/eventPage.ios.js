import React, { Component, PropTypes} from "react";
import { AppRegistry, ListView, ScrollView, Platform, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image, Alert} from "react-native";
import Button from "react-native-button";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import {Actions} from "react-native-router-flux";
import getGuests from "../../services/firebase/getGuests";
import handlePressMatch from "../../services/firebase/handlePressMatch";


class EventPage extends Component {
  constructor(props) {
  	super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {matches: [{name: "aaaa 23"}, {name: "bbbb 22"}]};
  }

  componentWillMount() {
    getGuests(this.props.eventObj).then(
      (guests)=>{
        console.log(guests);
        this.setState({matches: guests});
      },
      (err)=>{
        console.log(err);
      });
  }


  deleteRow(secId, rowId, rowMap) {
    Alert.alert(
      "Confirm Delete",
      "Removing a suitor will not show them again for this event.",
      [
        {text: "OK", onPress: () => {
          console.log("OK Pressed");
          rowMap[`${secId}${rowId}`].closeRow();
          const newData = [...this.state.matches];
          newData.splice(rowId, 1);
          this.setState({matches: newData});
        }},
        {text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"}
      ],
      { cancelable: false }
    );
  }

  onPressMatch(userObj){
    Alert.alert(
      "Confirm Match",
      "Congratulations, you have agreed to go out on your event with " + userObj.name + " !",
      [
        {text: "OK", onPress: () => {
          console.log(this);
          handlePressMatch(userObj.userID).then(
            (val)=> {
              console.log(val);
              Alert.alert(userObj.name + " has been notified. You can now message them!");
              Actions.pop();
              setTimeout(()=>{
                Actions.messages();
              });
            },
            (err)=>{
              console.log(err);
              Alert.alert("An unexpected error has happened, please try again later.");
            });
        }},
        {text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"}
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={styles.viewContainer}>
      <Text style={{padding: 20, fontSize: 18, color: "#70C1B3", textAlign: "center"}}>These potential matches have expressed interest in your event! </Text>

          <SwipeListView
              dataSource={this.ds.cloneWithRows(this.state.matches)}
              enableEmptySections={true}
              renderRow={ (data, secId, rowId, rowMap) => (
                <SwipeRow
                      leftOpenValue={75}
                      tension={4}
                      rightOpenValue={-75}
                      >
                      <View style={{flexGrow: 1, flexDirection: "row", alignItems:"flex-start", justifyContent: "center"}}>
                          <TouchableHighlight style={styles.rightRowBack} onPress={_ => this.onPressMatch(data)}>
                                  <Text style={styles.rightRowBackText}>Match</Text>
                          </TouchableHighlight>
                          <TouchableHighlight style={styles.leftRowBack} onPress={ _ => this.deleteRow(secId, rowId, rowMap)}>
                              <Text style={styles.leftRowBackText}>Remove</Text>
                          </TouchableHighlight>
                      </View>
                      <TouchableHighlight onPress={()=>{Actions.matchProfile({userID: data.userID});}}>
                          <View style={styles.rowFront}>
                            <Image source={{uri: data.picture}} style={styles.listImage}/>
                            <View style={{paddingLeft: 5, justifyContent: "center"}}>
                                <Text style={styles.rowFrontText}>{data.name}</Text>
                            </View>
                          </View>
                      </TouchableHighlight>
                  </SwipeRow>
            	)}
            />

          <Button
              containerStyle={{marginRight: 20, marginTop: 10, marginLeft: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
              style={{fontSize: 14, color: "white"}}
              onPress={()=>{Actions.pop();}}
              accessibilityLabel="Go Back"
            >
              Go Back
          </Button>
        </View>);
  	}
}


const styles = StyleSheet.create({
  leftRowBack: {
    width: 200,
    height: 100,
    flexGrow: 1,
    justifyContent:"center",
    alignItems: "center",
    backgroundColor:"#FF4136",
    paddingTop: 15,
    paddingBottom: 50,
  },
  leftRowBackText: {
  	marginLeft: 100,
    fontSize: 16,
  },
  rightRowBack: {
    width: 200,
    height: 100,
    flexGrow: 1,
    justifyContent:"center",
    alignItems: "center",
    backgroundColor:"#2ECC40",
    paddingTop: 15,
    paddingBottom: 50,
  },
  rightRowBackText: {
    marginRight: 100,
    fontSize: 16,
  },
  rowFront: {
    paddingLeft: 20,
    backgroundColor: "white",
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    borderBottomWidth:1,
    borderBottomColor:"orange",
    borderTopWidth:1,
    borderTopColor:"orange",
  },
  rowFrontText: {
  	color: "black",
    fontSize: 18
  },
});

export default EventPage;

EventPage.propTypes = {
  eventObj: React.PropTypes.object.isRequired,
};
