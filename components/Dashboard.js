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
            flexDirection: "row",
            marginTop: -20,
            marginBottom: height * 0.03,
            height: height * 0.15,
            width: width * 0.75,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#90EE90",
            opacity: 0.84,
            borderRadius: 10,
            elevation: 3,
          }}
          onPress={() => this.props.navigation.navigate("screen1Stress")}
        >
          <Text>Stress/Anxiety</Text>
          <Image style={styles.img} source={require("./assets/cloud.png")} />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => this.props.navigation.navigate("screen1Sad")}
          style={{
            flex: 0,
            flexDirection: "row",
            margin: height * 0.03,
            height: height * 0.15,
            width: width * 0.75,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ADD8E6",
            opacity: 0.84,
            borderRadius: 10,
            elevation: 3,
          }}
        >
          <Text>Sadness</Text>
          <Image style={styles.img} source={require("./assets/sunrain.png")} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 0,
            flexDirection: "row",
            margin: height * 0.03,
            height: height * 0.15,
            width: width * 0.75,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FA8072",
            opacity: 0.84,
            borderRadius: 10,
            elevation: 3,
          }}
          onPress={() => this.props.navigation.navigate("MusicScreen")}
        >
          <Text>Anger</Text>
          <Image
            style={styles.img}
            source={require("./assets/lightning.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
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
    height: height * 0.095,
    width: width * 0.2,
  },
});
