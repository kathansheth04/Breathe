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
import logo from "./assets/logo.png";
import { ActivityIndicator } from "react-native-paper";
import * as Progress from "react-native-progress";
import * as firebase from "firebase";
import FireBase from "./config/FireBase";

//loading page, which opens first when the app is launched
export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
    if (!firebase.apps.length) {
      //firebase initialization
      firebase.initializeApp(FireBase.config);
    }
  }
  componentDidMount() {
    //check if user is logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.props.navigation.navigate("main");
        //if the user is not logged in, take the user to the login screen where they can login
      } else {
        setTimeout(() => {
          this.props.navigation.navigate("loginScreen");
        }, 3000);
      }
    });
  }

  //layout of the page
  render() {
    return (
      <View style={styles.container}>
        {/*logo*/}
        <Image
          source={logo}
          style={{
            marginTop: -height * 0.15,
            height: height * 0.4,
            width: width * 0.6,
            alignSelf: "center",
          }}
        />
        <ActivityIndicator style={{position: 'absolute', bottom: 100}}size="large" color="#FFF"/>
      </View>
    );
  }
}

const { height, width } = Dimensions.get("window");

//stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E55B46", 
    opacity: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  ActivityIndicator: {
    alignItems: "center",
    alignContent: "center",
    marginTop: height * 0.1,
  },
});
