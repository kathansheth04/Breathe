import React, { Component } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import moment from "moment"

export default class screen1Stress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      eventDate:moment.duration().add({hours:0,minutes:1,seconds:0}), 
      mins:1,
      secs:0,
      response: ""
    };
  }
  async componentDidMount() {
    this.updateTimer()
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      });

      this.loadAudio();
    } catch (e) {
      console.log(e);
    }
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
  
  async loadAudio() {
    const { currentIndex, isPlaying, volume } = this.state;

    try {
      const playbackInstance = new Audio.Sound();
      const source = require("./Breathe.mp3");

      const status = {
        shouldPlay: isPlaying,
        volume,
      };

      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      this.setState({ playbackInstance });
    } catch (e) {
      console.log(e);
    }
  }

  onPlaybackStatusUpdate = (status) => {
    this.setState({
      isBuffering: status.isBuffering,
    });
  };
  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();

    this.setState({
      isPlaying: !isPlaying,
    });
  };

  //layout of the page
  render() {
    const { mins, secs } = this.state
    return (
      <View style={styles.container}>
        <View
          style={{
            height: height,
            width: width,
            marginTop: height * 0.3,
            borderRadius: 40,
            backgroundColor: "#FFF",
          }}
        >
          <Text style={{fontWeight:"bold",fontSize:30, alignItems: 'center', textAlign: 'center', marginTop: 10}}>
              {`0${mins} : ${secs}`}
            </Text>

          <Text style={{ margin: 20, fontSize: 20, marginTop: 20, textAlign: 'center' }}>
            Think on whether your anger is justified or not and now write what
            you can do to prevent yourself from being angry in the future.
          </Text>
          <Image
            source={require("./waterdrop.jpg")}
            style={{
              borderRadius: 30,
              height: 150,
              width: 300,
              alignSelf: "center",
            }}
          />
          <TextInput
            onChangeText={(response) => this.setState({ response })}
            multiline={true}
            textAlignVertical="top"
            placeholder = "Enter your items here!"
            placeholderTextColor = '#2C2F33'
            style={{
              width: width * 0.825,
              height: height * 0.25,
              borderColor: "black",
              borderWidth: 1,
              marginTop: height * 0.05,
              marginLeft: width * 0.085,
              padding: 15,
              borderRadius: 30,
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              width: width,
              alignItems: "center",
              justifyContent: "center",
              marginTop: -10,
            }}
          ></View>
          <Ionicons
            onPress={() => {
              if (this.state.response === "") {
                Alert.alert("Please complete this task before proceeding")
              } else {
                this.props.navigation.navigate("AngerScreen3")
              }
            }}
            name="ios-redo"
            size={35}
            style={{
              marginBottom: 120,
              alignSelf: "flex-end",
              marginEnd: 20,
              color: "#FA8072",
            }}
          />
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
    backgroundColor: "#FA8072",
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
});
