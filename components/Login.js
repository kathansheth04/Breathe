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
  Dimensions,
  ScrollView,
} from "react-native";
import logo from "./assets/logo.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import FireBase from "./config/FireBase";
import * as Google from "expo-google-app-auth";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoadingComplete: false,
    };
  }
  //function for logging user in
  loginAction = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log("user signed in!");
        this.props.navigation.navigate("main");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert(
            "This email already exists. Use a different email or reigster a new email."
          );
        } else if (error.code === "auth/invalid-email") {
          Alert.alert(
            "This email address is invalid. Try again using a different one"
          );
        } else if (error.code === "auth/user-not-found") {
          Alert.alert("This account does not exist. Please register.");
        } else {
          Alert.alert("Email or password is wrong.");
        }
      });
  };

  componentDidMount() {
    if (!firebase.apps.length) {
      //initialize firebase
      firebase.initializeApp(FireBase.config);
    }
  }
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("user signed in");
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(error);
      });
  }

  onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(function (result) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;
              // The signed-in user info.
              var user = result.user;
              console.log(user);
              // ...
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              console.log(error);
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "146881575660-5qp82vm70adfpog7g884kv2he87nbq94.apps.googleusercontent.com",
        iosClientId:
          "146881575660-gccp535qac2psmc5dfbcuau7cq6ko9ub.apps.googleusercontent.com", //enter ios client id
        androidStandaloneAppClientId:
          "146881575660-5qp82vm70adfpog7g884kv2he87nbq94.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("couldn't sign in user");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.select({
              ios: () => 0,
              android: () => height * -0.48,
            })()}
          >
            <Image source={logo} style={styles.logo}></Image>

            <Text style={styles.Title}>Your artificial Budgeting Manager</Text>
          </KeyboardAvoidingView>

          <TextInput
            style={styles.Email}
            onChangeText={(email) => this.setState({ email })}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.password}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor="#FFFFFF"
          />

          <TouchableOpacity
            style={styles.Login}
            onPress={() => {
              this.loginAction();
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: Platform.select({
                  ios: () => "AppleSDGothicNeo-Thin",
                  android: () => "sans-serif-thin",
                })(),
                color: "#fff",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.google} onPress={() => {firebase.auth().signInWithPopup(firebase.auth.GoogleAuthProvider())}}>
            <Text style={{fontSize: 24, color: "#fff"}}>Google</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.passwordReset2}
            onPress={() => {
              this.props.navigation.navigate("registerScreen");
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: Platform.select({
                  ios: () => "AppleSDGothicNeo-Thin",
                  android: () => "sans-serif-thin",
                })(),
                color: "#fff",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <Text
            style={styles.passwordReset1}
            onPress={() => {
              this.props.navigation.navigate("ForgotPassword");
            }}
          >
            Forgot Your Password? Click to reset!
          </Text>
        </ScrollView>
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
    backgroundColor: "#2C2F33",
    alignItems: "center",
    justifyContent: "center",
  },
  Email: {
    borderWidth: 0,
    color: "#FFFFFF",
    borderBottomColor: "#606060",
    borderBottomWidth: height * 0.001,
    marginTop: height * 0.07,
    marginLeft: width * 0.05,
    height: height * 0.05,
    width: width * 0.75,
  },
  google: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: height * 0.016,
    borderRadius: 60,
    width: width * 0.9,
  },
  logo: {
    height: height * 0.5,
    width: width * 0.9,
  },
  password: {
    borderWidth: 0,
    color: "#FFFFFF",
    borderBottomColor: "#606060",
    borderBottomWidth: height * 0.001,
    marginTop: height * 0.025,
    marginLeft: width * 0.05,
    height: height * 0.05,
    width: width * 0.75,
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
    width: width * 0.9,
    marginTop: height * 0.1,
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
