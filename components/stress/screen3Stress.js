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
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class screen2Stress extends Component {
    constructor(props) {
        super(props);
    }
    

  //layout of the page
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: height, width: width, marginTop: height*0.3, borderRadius: 40, backgroundColor: '#FFF'}}>
        <Text style={{margin: 20, fontSize: 20, marginTop: 100}}>
            Cooking something that you truly like 
            eating or drinking can be very beneficial. Eating what you 
            like can not only uplift your mood but the process of cooking
            can be really relaxing!
        </Text>
        <Image source={require('./hotchocolate.jpg')} style={{borderRadius: 30, height: 200, width: 250, alignSelf: 'center'}}/>
            <View style={{flex: 1, flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center', marginTop: 80}}>
                
                <TouchableOpacity 
                style={{backgroundColor: "#90EE90",borderRadius:30, justifyContent: 'center', alignItems: 'center', height: 50, width: 250, marginBottom: 50}}
                onPress={() => Linking.openURL("https://celebratingsweets.com/homemade-hot-chocolate/#wprm-recipe-container-12928")}>
                    <Text style={{fontSize: 20}}>Open Recipe</Text>
                </TouchableOpacity>
            </View>
            <Ionicons onPress={() => this.props.navigation.navigate("main")}
            name='ios-redo' size={35} style={{marginBottom: 120, alignSelf: 'flex-end', marginEnd: 20, color: '#90EE90'}}/>
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
    backgroundColor: "#90EE90", 
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
  }
});
