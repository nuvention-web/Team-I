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
  ListView
} from "react-native";
import firebaseApp from "../../services/firebase/firebaseService";
import {Actions} from "react-native-router-flux";

class Messages extends Component {
  	constructor(props){
  		super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 5']),
      };
  	}

  	render(){
  		return(
        <ListView
        style={styles.viewContainer}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
  		);
  	}
}

export default Messages;


const styles = StyleSheet.create({
  viewContainer: {
    ...Platform.select({ios: {top: 129},android: {top: 89}}),
  },
});
