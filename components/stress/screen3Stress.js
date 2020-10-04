import React, { Component } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  ProgressBarAndroid,
  Dimensions,
} from "react-native";

export default class screen2Stress extends Component {
    constructor(props) {
        super(props);
    }
    

  //layout of the page
  render() {
    return (
      <View style={styles.container}>
        <Text>hi</Text>

      </View>
    );
  }
}

const { height, width } = Dimensions.get("window");

//stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#90EE90", 
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
  }
});
