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
import GoogleIcon from './assets/GoogleIcon.png'
//Registeration Screen
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    //parameters required for user registeration
    this.state = {
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
        .then(() => this.props.navigation.navigate("main"));
        
    } catch (error) {
      //if user cannot be logged in at the moment, he will be alerted
      console.log("error");
      Alert.alert("Cannot Register user at the moment. Try again later.");
    }
  };
  //JSX design/layout of the register screen
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        
        <View style={{
          borderRadius: 30,
          height: height,
          width: width,
          opacity: 1,
          marginTop: height*0.4, 
          justifyContent: 'center', 
          alignContent: 'center', 
          backgroundColor: '#FFFCFC',}}>
            <Image style={{marginTop: -280, height: 250, width: 250, alignSelf: 'center'}}source={logo}/>
            <TextInput
            style={styles.Email}
            onChangeText={(email) => this.setState({ email })}
            placeholder="Email"
            placeholderTextColor="#2C2F33"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.password}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor="#2C2F33"
          />
          <TextInput
            style={{...styles.password, marginTop: -60}}
            secureTextEntry={true}
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
            placeholder="Confirm Password"
            autoCapitalize="none"
            placeholderTextColor="#2C2F33"
          />
          <TouchableOpacity style={styles.Login} onPress={() => this.signupUser()}>
            <Text style={{fontSize: 22}}>Sign In</Text>
          </TouchableOpacity>
          
        <Text style={{marginTop: 50, alignSelf: 'center'}} 
        onPress={() => this.props.navigation.navigate("loginScreen")}>
          Don't have an account? Sign Up
        </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const { height, width } = Dimensions.get("window");

//height = 625
//width = 125

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E55B46",
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGPlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    padding: height * 0.016,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    elevation: 3,
    shadowColor: 'rgba(0,0,0, .4)', 
    shadowOffset: { height: 3, width: 3 }, 
    shadowOpacity: 3, 
    shadowRadius: 3, 
    width: width * 0.9,
    marginBottom: height*0.1
  },
  
  buttonTextStyle: {
    color: '#000000',
  },
  Email: {
    borderWidth: 0,
    color: "#000",
    borderBottomColor: "#606060",
    borderBottomWidth: height * 0.001,
    alignSelf: 'center',
    height: height * 0.05,
    width: width * 0.75,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  logo: {
    height: height * 0.5,
    width: width * 0.9,
  },
  password: {
    borderWidth: 0,
    color: "#000",
    borderBottomColor: "#606060",
    borderBottomWidth: height * 0.001,
    marginTop: height*0.03,
    marginBottom: height*0.12,
    alignSelf: 'center',
    height: height * 0.05,
    width: width * 0.75,
  },
  Login: {
    alignSelf: "center",
    alignItems: 'center',
    backgroundColor: '#E55B46',
    padding: height * 0.016,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    elevation: 3,
    shadowColor: 'rgba(0,0,0, .4)', 
    shadowOffset: { height: 3, width: 3 }, 
    shadowOpacity: 3, 
    shadowRadius: 3, 
    width: width * 0.9,
    marginBottom: 40
  },
  passwordReset1: {
    color: "#FFF",
    textAlign: "center",
    marginTop: height * 0.03,
    fontFamily: Platform.select({
      ios: () => "AppleSDGothicNeo-Thin",
      android: () => "sans-serif-thin",
    })(),
  },
  passwordReset2: {
    alignItems: "center",
    padding: height * 0.016,
    borderRadius: 10,
    borderWidth: 1,
    borderBottomColor: "#FFF",
    borderTopColor: "#FFF",
    borderRightColor: "#FFF",
    borderLeftColor: "#FFF",
    width: width * 0.9,
    marginTop: height * 0.03,
    fontFamily: Platform.select({
      ios: () => "AppleSDGothicNeo-Thin",
      android: () => "sans-serif-thin",
    })(),
  },
  Title: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: Platform.select({
      ios: () => "AppleSDGothicNeo-Thin",
      android: () => "sans-serif-thin",
    })(),
    marginTop: -height * 0.1,
    textAlign: "center",
    justifyContent: "center",
  },
});
