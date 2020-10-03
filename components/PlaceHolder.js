import React, { Component, useEffect } from "react";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  UIManager,
  Text,
  View,
  Alert,
  TextInput,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Routes extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            flex: 0,
            flexDirection: "column",
            margin: height * 0.03,
            height: height * 0.15,
            width: width * 0.75,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#90EE90",
            borderRadius: 10,
          }}
        >
          <Text>Sadness</Text>
          <Image style={styles.img} source={require("./assets/cloud.png")} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 0,
            flexDirection: "column",
            margin: height * 0.03,
            height: height * 0.15,
            width: width * 0.75,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ADD8E6",
            borderRadius: 10,
          }}
        >
          <Text>Stress/Anxiety</Text>
          <Image style={styles.img} source={require("./assets/cloud.png")} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 0,
            flexDirection: "column",
            margin: height * 0.03,
            height: height * 0.15,
            width: width * 0.75,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FA8072",
            borderRadius: 10,
          }}
        >
          <Text>Anger</Text>
          <Image style={styles.img} source={require("./assets/cloud.png")} />
        </TouchableOpacity>
      </View>
    );
  }
}
const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffedcc",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    flex: 0,
    flexDirection: "column",
    margin: height * 0.03,
    height: height * 0.15,
    width: width * 0.75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#90EE90",
    borderRadius: 10,
  },
  img: {
    height: height * 0.1,
    width: width * 0.3,
  },
});
