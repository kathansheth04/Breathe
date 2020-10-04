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
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons";

export default class AngerScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }
  async componentDidMount() {
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
  async loadAudio() {
    const { currentIndex, isPlaying, volume } = this.state;

    try {
      const playbackInstance = new Audio.Sound();
      const source = require("../stress/Beach-ambience.mp3");

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
          <Text style={{ margin: 20, fontSize: 20, marginTop: 100 }}>
            Write down all the people or things that make you angry and why?
          </Text>
          <Image
            source={require("../assets/peaceful.jpg")}
            style={{
              borderRadius: 30,
              height: 200,
              width: 250,
              alignSelf: "center",
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
          >
            <TouchableOpacity>
              {this.state.isPlaying ? (
                <Ionicons
                  name="ios-pause"
                  size={100}
                  color="#90EE90"
                  style={{ opacity: 1 }}
                  onPress={() => this.handlePlayPause()}
                />
              ) : (
                <Ionicons
                  name="ios-play-circle"
                  size={100}
                  color="#90EE90"
                  style={{ opacity: 1 }}
                  onPress={() => this.handlePlayPause()}
                />
              )}
            </TouchableOpacity>
          </View>
          <Ionicons
            onPress={() => this.props.navigation.navigate("main")}
            name="ios-redo"
            size={35}
            style={{
              marginBottom: 120,
              alignSelf: "flex-end",
              marginEnd: 20,
              color: "#90EE90",
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
    backgroundColor: "#90EE90",
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
});
