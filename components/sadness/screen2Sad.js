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
import moment from "moment"


export default class screen2Sad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            eventDate:moment.duration().add({hours:0,minutes:2,seconds:0}), 
            mins:2,
            secs:0
        }
        
    }

    componentDidMount(){
      this.updateTimer()
    }
    updateTimer=()=>{
      
      const x = setInterval(()=>{
        let { eventDate} = this.state
  
        if(eventDate <=0){
          clearInterval(x)
        }else {
          eventDate = eventDate.subtract(1,"s")
          const hours = eventDate.hours()
          const mins = eventDate.minutes()
          const secs = eventDate.seconds()
          
          this.setState({
            hours,
            mins,
            secs,
            eventDate
          })
        }
      },1000)
  
    }

  //layout of the page
  render() {
    const { mins, secs } = this.state
    return (
      <View style={styles.container}>
        <View style={{height: height, width: width, marginTop: height*0.3, borderRadius: 40, backgroundColor: '#FFF'}}>
            <Text style={{fontWeight:"bold",fontSize:30, alignItems: 'center', textAlign: 'center', marginTop: 10}}>
              {`0${mins} : ${secs}`}
            </Text>
            <Text style={{margin: 20, fontSize: 20, marginTop: 40, textAlign: 'center'}}>
            Reading funny comic books or stories can help uplift your mood. Let's read a
            some that are not only short but hilarious!
            </Text>
            <Image source={require('./comic.jpg')} style={{borderRadius: 30, height: 200, width: 250, alignSelf: 'center', marginTop: 30, marginBottom: 60}}/>
            <View style={{flex: 1, flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity 
                style={{backgroundColor: "#ADD8E6",borderRadius:30, justifyContent: 'center', alignItems: 'center', height: 50, width: 250, marginBottom: 50}}
                onPress={() => Linking.openURL("https://theawkwardyeti.com/comic/in-love/")}>
                    <Text style={{fontSize: 20}}>Read Comic Book</Text>
                </TouchableOpacity>
            </View>
            <Ionicons onPress={() => this.props.navigation.navigate("screen3Sad")}
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
