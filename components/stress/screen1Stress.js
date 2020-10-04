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
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment"
import { Ionicons } from "@expo/vector-icons";
import {Audio} from 'expo-av'

export default class screen1Stress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false, 
            eventDate:moment.duration().add({hours:0,minutes:1,seconds:30}), 
            mins:1,
            secs:30
      }
        
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
            playThroughEarpieceAndroid: true
          })
     
          this.loadAudio()
        } catch (e) {
          console.log(e)
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
        const {currentIndex, isPlaying, volume} = this.state
       
        try {
          const playbackInstance = new Audio.Sound()
          const source = require('./Beach-ambience.mp3')
       
          const status = {
            shouldPlay: isPlaying,
            volume
          }
       
          playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)     
          await playbackInstance.loadAsync(source, status, false)
          this.setState({playbackInstance})
          } catch (e) {
            console.log(e)
          }
      }
       
      onPlaybackStatusUpdate = status => {
        this.setState({
          isBuffering: status.isBuffering
        })
      }
      handlePlayPause = async () => {
        const { isPlaying, playbackInstance } = this.state
        isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()
     
        this.setState({
          isPlaying: !isPlaying
        })
      }

  //layout of the page
  render() {
    const { hours, mins, secs } = this.state
    return (
      <View style={styles.container}>
        <View style={{height: height, width: width, marginTop: height*0.3, borderRadius: 40, backgroundColor: '#FFF'}}>
        <View>
        </View>
            <Text style={{fontWeight:"bold",fontSize:30, alignItems: 'center', textAlign: 'center', marginTop: 10}}>
              {`0${mins} : ${secs}`}
            </Text>
            <Text style={{margin: 20, fontSize: 20, marginTop: 10, textAlign: 'center'}}>
                Close your eyes and imagine yourself on a Beach. You are sipping on your orange juice which 
                you still don't know how you got it on the island!
            </Text>
            <Image source={require('./beach.jpeg')} style={{borderRadius: 30, height: 200, width: 250, alignSelf: 'center', marginTop: 20}}/>
            <View style={{flex: 1, flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
                
                <TouchableOpacity>
                    {
                        this.state.isPlaying ? (
                            <Ionicons name='ios-pause' size={100} color='#90EE90' style={{opacity: 1}} onPress={() => this.handlePlayPause()}/>
                        ) : (
                            <Ionicons name='ios-play-circle' size={100} color='#90EE90' style={{opacity: 1}} onPress={() => this.handlePlayPause()}/>
                        )
                    }
                    
                </TouchableOpacity>
            </View>
            <Ionicons onPress={() => this.props.navigation.navigate("screen2Stress")}
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
