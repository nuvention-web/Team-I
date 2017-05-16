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
  ListView,
  TouchableHighlight
} from "react-native";
import firebaseApp from "../../services/firebase/firebaseService";
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

      else {
        return(
        <View style={styles.container}>
          <View style={styles.listContainer}>
            <ListView
              dataSource={this.ds.cloneWithRows(this.state.guestList)}
              renderRow={(rowData) =>
                <TouchableHighlight onPress={() => this.onMessagePress(rowData)}>
                  <View style={styles.listItem}>
                    <View style={styles.listIcon}>
                      <Image style={styles.channelIcon} source={{uri: rowData.picture}} />
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
    backgroundColor: '#f7f8fc',
    borderBottomWidth: 0.5,
    borderColor: '#D0DBE4',
    padding: 5
  },
  listIcon: {
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 15
  },
  channelIcon: {
    width: 30,
    height: 30
  },
  listInfo: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  titleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#60768b',
  },
  memberLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#abb8c4',
  }
});