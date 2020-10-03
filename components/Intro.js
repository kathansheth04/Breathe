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
        firebase
          .firestore()
          .doc(`/FinancialInfo/${firebase.auth().currentUser.uid}`)
          .get()
          .then((snapshot) => {
            //if user's info value (income, savings, food, and other parameters) exists in the database:
            if (snapshot.exists) {
              //navigate to main, which is the drawer navigator, chatbot being the default screen
              console.log("exists");
              this.props.navigation.navigate("main");
            } else {
              //if the info does not exist, take the user to the info screen so that they can enter their information
              this.props.navigation.navigate("routesScreen");
              console.log("does not exist");
            }
          });
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
            height: height * 0.7,
            width: width * 0.9,
            alignItems: "center",
          }}
        />
        {/*loading bar*/}
        <ProgressBarAndroid
          style={styles.ActivityIndicator}
          styleAttr="Horizontal"
          color="#FFFFFF"
          indeterminate={true}
          width={150}
        />
      </View>
    );
  }
}

const { height, width } = Dimensions.get("window");

//stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E55B46", //main gray color of the logo and the overall theme
    alignItems: "center",
    justifyContent: "center",
  },
  ActivityIndicator: {
    alignItems: "center",
    alignContent: "center",
    marginTop: height * 0.1,
  },
});
