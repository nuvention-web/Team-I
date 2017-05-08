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
import getFirebaseSelf from "../../services/firebase/getFirebaseSelf";
import {Actions} from "react-native-router-flux";
var PULLDOWN_DISTANCE = 40;
class Messages extends Component {
    constructor(props){
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 5']),
      };
    }

    componentWillMount(){
      getFirebaseSelf().then(
      (usr)=>{
        getEventSelf(usr.userID).then(
          (eventObj)=>{
            console.log(eventObj);
            this.setState({userObj: usr, eventObj: eventObj, refreshing: false});
          },
          (err)=>{
            console.log(err);
            this.setState({refreshing: false});
          });
      },
      (err)=>{
        console.log(err);
        this.setState({refreshing: false});
      });
    }

    render(){
      return(
        <View style={styles.container}>
          <View style={styles.listContainer}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                <TouchableHighlight onPress={() => this.onChannelPress(rowData.channel_url)}>
                  <View style={styles.listItem}>
                    <View style={styles.listIcon}>
                      <Image style={styles.channelIcon} source={{uri: rowData.cover_img_url}} />
                    </View>
                    <View style={styles.listInfo}>
                      <Text style={styles.titleLabel}># {rowData.name}</Text>
                      <Text style={styles.memberLabel}>{rowData.member_count} members</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              }
              onEndReached={() => this.getChannelList(this.state.next)}
              onEndReachedThreshold={PULLDOWN_DISTANCE}
            />
          </View>
        </View>
        );
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