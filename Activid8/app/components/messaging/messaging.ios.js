import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  Platform,
  ListView,
  TouchableHighlight
} from "react-native";
import firebaseApp from "../../services/firebase/firebaseService";
import Button from "react-native-button";
import getEventSelf from "../../services/firebase/getEventSelf";
import getMatchedGuests from "../../services/firebase/getMatchedGuests";
import getFirebaseUser from "../../services/firebase/getFirebaseUser";
import {Actions} from "react-native-router-flux";
var PULLDOWN_DISTANCE = 40;
class Messages extends Component {
    constructor(props){
      super(props);
      this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        refreshing: false
      };
    }



    componentWillMount(){
      this.setState({refreshing: true});
      getMatchedGuests().then(
        (guestList)=>{
          this.setState({
              guestList: guestList,
              refreshing: false
          });
          console.log(this.state.guestList);
        },
        (err)=>{
          console.log(err);
          this.setState({refreshing: false});
        }
      );
    }
    onMessagePress(guest){
      Actions.chatBox({guestObj: guest});
    }

    getMessageList(){

    }

    render(){
      if(this.state.refreshing){
        return(
          <View style={{marginTop: 89}}><Text>Loading...</Text></View>
        )
      }
      if(this.state.guestList.length === 0){
        return(
        <View style={styles.container}>
          <Text style={{margin: 5, textAlign: "center", fontSize: 20, color: "#70C1B3"}}>Matches will appear here.{"\n"} Start Swiping to get some matches now!</Text>
          <Button
              containerStyle={{marginRight: 20, marginLeft: 20, marginTop: 20, padding:10, height:45, overflow:"hidden", borderRadius:10, backgroundColor: "#70C1B3"}}
              style={{fontSize: 14, color: "white"}}
              onPress={()=>{Actions.home();}}
              accessibilityLabel="Back"
            >
            Home
          </Button>
        </View>
        )
      }

      else {
        return(
        <View style={styles.container}>
          <View style={styles.listContainer}>
            <ListView
              dataSource={this.ds.cloneWithRows(this.state.guestList)}
              renderRow={(rowData) =>
                <TouchableHighlight onPress={() => this.onMessagePress(rowData)}>
                  <View style={styles.listItem}>
                    <View>
                      <Image style={styles.listPicture} source={{uri: rowData.picture}} />
                    </View>
                    <View style={styles.listInfo}>
                      <Text style={styles.titleLabel}>{rowData.name}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              }
              onEndReached={() => this.getMessageList()}
              onEndReachedThreshold={PULLDOWN_DISTANCE}
            />
          </View>
        </View>
        );
      }
    }
}

export default Messages;


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff'
  },
  listContainer: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 70
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#70C1B3',
    borderWidth: 1.0,
    borderColor: '#D0DBE4',
    padding: 5
  },
  listPicture: {
    justifyContent: 'flex-start',
    margin: 5,
    marginLeft: 15,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 15,
    width: 50,
    height: 50,
  },
  listInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  titleLabel: {
    fontSize: 15,
    fontWeight: '200',
    color: '#ffffff',
    marginLeft: 20,
  },
});
