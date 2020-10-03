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

export default class Routes extends React.Component {
  render() {
    return (
      <View>
        <Text>Routes</Text>
      </View>
    );
  }
}
