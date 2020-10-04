import React, { Component } from "react";
import {
  Button,
  Image,
  Platform,
  NativeModules,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import logo from "./assets/logo.png";
import {
  keyboardAwareScrollView,
  KeyboardAwareScrollView,
} from "react-native-keyboard-aware-scroll-view";
import { Card, Icon } from "react-native-elements";
import { ListItem, CardItem } from "native-base";
import avatar from "./assets/avatar.png";
import * as firebase from "firebase";
import FireBase from "./config/FireBase";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      //firebase initialization
      firebase.initializeApp(FireBase.config);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={avatar}
          style={{
            ...styles.Avatar,
            height: Platform.OS === "ios" ? height * 0.3 : height * 0.3,
            width: Platform.OS === "ios" ? width * 0.53 : height * 0.3,
            marginTop: -height * 0.1,
            marginBottom: height * 0.05,
          }}
        />

        <View style={styles.card1}>
          <ListItem style={styles.ListItem}>
            <Text
              onPress={() => {
                this.props.navigation.navigate("UpdateName");
              }}
              style={{ color: "#000", fontSize: 15, marginTop: 15 }}
            >
              Change your username
            </Text>
          </ListItem>

          <ListItem style={styles.ListItem}>
            <Text
              style={styles.settings}
              onPress={() => {
                this.props.navigation.navigate("UpdatePassword");
              }}
            >
              Change your password
            </Text>
          </ListItem>

          <ListItem style={styles.ListItem}>
            <Text
              style={styles.settings}
              onPress={() =>
                firebase
                  .auth()
                  .signOut()
                  .then(() => console.log("user signed out")).then(() => this.props.navigation.navigate("loginScreen"))
                  .catch((err) => {
                    console.log("unable to sign user out");
                  })
              }
            >
              Logout
            </Text>
          </ListItem>
        </View>
      </View>
    );
  }
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  settings: {
    color: "#000",
    fontSize: 15,
    marginTop: height * 0.03,
  },
  Avatar: {
    alignItems: "center",
    justifyContent: "center",
  },

  card1: {
    borderRadius: 20,
    elevation: 3,
    height: height * 0.28,
    width: width * 0.85,
    backgroundColor: "#E55B46",
    opacity: 0.7,
    shadowOffset: { wdith: 3, height: 1 },
    shadowColor: "#fff",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  ListItem: {
    borderColor: '#000',
    width: width * 0.7,
    alignItems: "center",
    marginTop: -20,
    marginLeft: width * 0.00005,
  },
});
