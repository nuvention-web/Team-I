const React = require("react-native");
const {StyleSheet} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tabbar: {
    backgroundColor:"white",
    height: 64,
    borderTopColor: "red",
    borderTopWidth: 2
  },
  androidTabbar: {
    top: 0,
    borderBottomColor: "red",
    borderBottomWidth: 2,
    borderTopColor: 0
  }
});

module.exports = styles;
