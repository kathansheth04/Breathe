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
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import * as firebase from "firebase";
import logo from "./assets/logo.png";
import FireBase from "./config/FireBase";

//Registeration Screen
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    //parameters required for user registeration
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    //initialize firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(FireBase.config);
    }
  }
  //function to sign up user
  signupUser = () => {
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    try {
      //if the following requirements are met, new user will be created with email and password in firebase
      if (this.state.password.length < 7) {
        Alert.alert("Please enter at least 7 characters");
        return;
      } else if (
        this.state.password.toString() != this.state.confirmPassword.toString()
      ) {
        Alert.alert("Passwords do not match. Please try again");
        return;
      } else if (
        this.state.name.toString() == "" ||
        this.state.email.toString() == "" ||
        this.state.password.toString() == "" ||
        this.state.confirmPassword.toString() == ""
      ) {
        Alert.alert("Please fill in all missing values");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        //username will be added in the firebase database
        .then(() =>
          firebase
            .firestore()
            .doc(`/users/${firebase.auth().currentUser.uid}`)
            .set({
              email: this.state.email,
              password: this.state.password,
              confirmPassword: this.state.confirmPassword,
              name: this.state.name,
              createdOn: new Date().toISOString(),
              userId: firebase.auth().currentUser.uid,
            })
        )
        .then(() => this.props.navigation.navigate("routesScreen"));
    } catch (error) {
      //if user cannot be logged in at the moment, he will be alerted
      console.log("error");
      Alert.alert("Cannot Register user at the moment. Try again later.");
    }
  };
  //JSX design/layout of the register screen
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image style={{ ...styles.logo }} source={logo}></Image>

          <Text style={styles.Title}>Your artificial Budgeting Manager</Text>

          <TextInput
            style={{
              borderWidth: 0,
              color: "#FFFFFF",
              marginLeft: width * 0.03,
              borderBottomColor: "#606060",
              borderBottomWidth: height * 0.001,
              height: height * 0.05,
              width: width * 0.75,
              marginTop: height * 0.05,
            }}
            onChangeText={(name) => this.setState({ name })}
            placeholder="Name"
            placeholderTextColor="#FFFFFF"
          />
          <TextInput
            style={styles.TextInput}
            onChangeText={(email) => this.setState({ email })}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.TextInput}
            onChangeText={(password) => this.setState({ password })}
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry={true}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.TextInput}
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
            placeholder="Confirm Password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry={true}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.Login}
            onPress={() => {
              this.signupUser(this.state.name);
            }}
          >
            <Text style={{ fontSize: 18, color: "#fff" }}>Sign up</Text>
          </TouchableOpacity>

          <Text
            style={styles.signUp}
            onPress={() => {
              this.props.navigation.navigate("loginScreen");
            }}
          >
            Already have an account? Sign in
          </Text>

          <View style={styles.placeholder}></View>
        </ScrollView>
      </View>
    );
  }
}

const { height, width } = Dimensions.get("window");

//height = 625
//width = 125

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2F33",
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    borderWidth: 0,
    color: "#FFFFFF",
    borderBottomColor: "#606060",
    borderBottomWidth: height * 0.001,
    marginLeft: width * 0.03,
    marginTop: height * 0.02,
    height: height * 0.05,
    width: width * 0.75,
  },
  logo: {
    height: height * 0.5,
    width: width * 0.9,
  },
  Login: {
    alignItems: "center",
    padding: height * 0.016,
    borderRadius: 10,
    borderWidth: 1,
    borderBottomColor: "#FFF",
    borderTopColor: "#FFF",
    borderRightColor: "#FFF",
    borderLeftColor: "#FFF",
    marginTop: height * 0.05,
    width: width * 0.9,
  },
  signUp: {
    color: "#FFFFFF",
    marginTop: height * 0.03,
    textAlign: "center",
  },
  Title: {
    color: "#FFF",
    fontSize: 15,
    marginTop: -height * 0.1,
    textAlign: "center",
  },
});
