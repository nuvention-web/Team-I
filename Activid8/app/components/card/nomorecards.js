import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";


let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text style={{color: "#70C1B3", fontSize: 20, textAlign: "center"}}>No more events in your Area.{"\n"} Check again in a little while!</Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  noMoreCards: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoMoreCards;
