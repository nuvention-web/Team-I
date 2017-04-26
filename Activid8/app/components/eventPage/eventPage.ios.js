import React, {	Component, PropTypes} from "react";
import { AppRegistry, ListView, Button, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image, Alert} from "react-native";

import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";

class EventPage extends Component {
  constructor(props) {
  	super(props);
    this.state = {profile: false};
  }

  onPressMatch(){
    Alert.alert(
      "Confirm Match",
      "Congratulations, you have agreed to go out on your event with Taylor!",
      [
        {text: "OK", onPress: () => {
          console.log(this);
          Alert.alert("Taylor has been notified. You can now message her!");
        }},
        {text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"}
      ],
      { cancelable: false }
    );
  }

  onPressRemove(){
    Alert.alert(
      "Confirm Delete",
      "Removing a suitor will not show them again for this event.",
      [
        {text: "OK", onPress: () => {
          console.log("OK Pressed");
        }},
        {text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"}
      ],
      { cancelable: false }
    );
  }


  onPressProfile = () =>{
    this.setState(
      {profile: !this.state.profile}
    );
    // this..navigator.push({name: "otherProfile"});
  }

  render() {
    // const taylor = require("../../imgs/taylor.jpg");

    if (!this.state.profile){
      var temp = (
        <View>
        <Text style={{padding: 20, fontSize: 18, color: "#FF851B", textAlign: "center"}}>These potential matches have expressed interest in your event! </Text>
        <SwipeRow
                leftOpenValue={75}
                tension={4}
                rightOpenValue={-75}
                >
                <View style={{flexGrow: 1, flexDirection: "row", alignItems:"flex-start", justifyContent: "center"}}>
                    <TouchableHighlight style={styles.rightRowBack} onPress={this.onPressMatch}>
                            <Text style={styles.rightRowBackText}>Match</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.leftRowBack} onPress={this.onPressRemove}>
                        <Text style={styles.leftRowBackText}>Remove</Text>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight onPress={this.onPressProfile}>
                    <View style={styles.rowFront}>
                      {/* <Image source={taylor} style={styles.listImage}/> */}
                      <View style={{paddingLeft: 5, justifyContent: "center"}}>
                          <Text style={styles.rowFrontText}>Taylor, 26</Text>
                      </View>

                    </View>
                </TouchableHighlight>
            </SwipeRow>
          </View>);
    }
    else {
      var temp = (
        <ScrollView>
          <Button
              onPress={this.onPressProfile}
              title="Go back"
              color="#FF8900"
              accessibilityLabel="Back"
            />
          <View style={{justifyContent: 'center',
          alignItems: 'center',}}>
            <Image style={styles.thumbnail} source={taylor} />
          </View>
          <Text style = {styles.titleText}>Name:</Text>
          <Text style = {styles.detailText}>Taylor</Text>
          <Text style = {styles.titleText}>Age:</Text>
          <Text style = {styles.detailText}>26</Text>
          <Text style = {styles.titleText}>Bio:</Text>
          <Text style = {styles.detailText}>Hi there! Looking for a partner to go on adventures and to write songs about once we break up. lol.{"\n"} </Text>

      </ScrollView>
      );
    }

  		return (<View>{temp}</View>);
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
  listImage: {
    // top: 3,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  thumbnail: {
    // flex: 1,

    width: 240,
    height: 240,
  },
  detailText: {
    fontSize: 16,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 25,
    paddingRight: 20,
    textAlign: 'justify'
  },
  titleText: {
    fontSize: 18,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 20,
    textAlign: 'justify',
    color: "#FF8900"
  },
});

export default EventPage;
