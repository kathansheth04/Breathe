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
  Linking,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";


export default class screen1Sad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        }
        
    }

  //layout of the page
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: height, width: width, marginTop: height*0.3, borderRadius: 40, backgroundColor: '#FFF'}}>
            <Text style={{margin: 20, fontSize: 20, marginTop: 100}}>
            Cycling boosts your mood in the same way all physical exercise 
            makes you happy by influencing the release and uptake of chemicals 
            in your brain that make you feel good. Take a ride on this route!
            </Text>
            <Image source={require('./googlemaps.jpg')} style={{borderRadius: 30, height: 200, width: 250, alignSelf: 'center', marginBottom: 60}}/>
            <View style={{flex: 1, flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity 
                style={{backgroundColor: "#ADD8E6",borderRadius:30, justifyContent: 'center', alignItems: 'center', height: 50, width: 250, marginBottom: 50}}
                onPress={() => Linking.openURL("https://tinyurl.com/routechosen")}>
                    <Text style={{fontSize: 20}}>Open Map</Text>
                </TouchableOpacity>
            </View>
            <Ionicons onPress={() => this.props.navigation.navigate("screen2Sad")}
            name='ios-redo' size={35} style={{marginBottom: 120, alignSelf: 'flex-end', marginEnd: 20, color: '#ADD8E6'}}/>
        </View>

      </View>
    );
  }
}

const { height, width } = Dimensions.get("window");

//stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6", 
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
  }
});
