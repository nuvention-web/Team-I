import React, {PropTypes} from "react";
import {Text} from "react-native";

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => (
  <Text
    style={{ color: props.selected ? "#6DC2B3" : "black" }}
  >
    {props.title}
  </Text>
);

TabIcon.propTypes = propTypes;

export default TabIcon;
