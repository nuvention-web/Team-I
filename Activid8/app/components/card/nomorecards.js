import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";


let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  noMoreCards: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});

export default NoMoreCards;
