// app/index.js

import React, { Component} from "react";
import { View, Text, StyleSheet, Platform, Image } from "react-native";
import Tabs from "react-native-tabs";
import Button from "./components/button/button";
import Home from "./components/home/home";

const styles = require("./styles.js");


export default class Activid8 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "home"
    };
  }

  render() {
    const { page } = this.state;
    const profImg = require("./imgs/FabioIcon.png");

    var temp = (<Text>State: {page} does not have handler</Text>);
    if (this.state.page == "profile") temp = (<Text>PROFILE</Text>);
    if (this.state.page == "home"){ temp = (<Home style={{flex: 1, height: 300}}/>);}
    if (this.state.page == "messages"){ temp = (<Button text='Click Me!' />);}

    const tabbarStyles = [styles.tabbar];
    const profileimg = [styles.profileimage];
    if (Platform.OS === "android") tabbarStyles.push(styles.androidTabbar);

    return (
      <View style={[styles.container]}>
        <Tabs
          selected={page}
          style={tabbarStyles}
          selectedStyle={{color:"red"}} onSelect={el=>this.setState({page:el.props.name})}
        >
            <Text name="profile">
              <Image source={profImg} style={profileimg}/>
            </Text>
            <Text name="home">Home</Text>
            <Text name="messages">Messages</Text>
        </Tabs>

        {temp}
      </View>
    );
  }
}
