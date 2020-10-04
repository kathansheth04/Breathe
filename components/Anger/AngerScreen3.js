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
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

export default class screen1Stress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      isPlaying: false,
    };
  }
  handlePickImage = async () => {
    try {
      const res = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
      );
      console.log("Permissions:", res);

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
      });

      console.log("Picker Result", result);

      if (!result.cancelled) {
        this.setState({ photo: result });
        Alert.alert("Photo selected");
      }
    } catch (err) {
      console.log("ERR", err);
    }
  };
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
    const { photo } = this.state;
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
          <Text style={{ margin: 20, fontSize: 20, marginTop: 50 }}>
            Draw your emotions on a piece of paper and upload it to the app.
          </Text>
          <Image
            source={require("./sunset.png")}
            style={{
              borderRadius: 30,
              height: 150,
              width: 300,
              alignSelf: "center",
            }}
          />
          {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={{
                flexDirection: "column",
                width: 200,
                height: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          )}
          <TouchableOpacity
            style={{
              backgroundColor: "#0000FF",
              width: width * 0.8,
              height: height * 0.075,
              marginTop: height * 0.23,
              marginLeft: width * 0.09,
              borderRadius: 15,
              shadowColor: "black",
              shadowOpacity: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={this.handlePickImage}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Choose Photo
            </Text>
          </TouchableOpacity>
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
