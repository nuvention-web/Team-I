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
    marginTop: 25,
    // top: 0,
    borderBottomColor: "red",
    borderBottomWidth: 2,
    flex: 1
  },
  androidTabbar: {
    top: 0,
    borderBottomColor: "red",
    borderBottomWidth: 2,
    borderTopColor: 0
  },
  profileimage: {
    
    // top: 3,
    width: 40,
    height: 40,
    borderRadius: 20
  }
});

module.exports = styles;
