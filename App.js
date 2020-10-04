import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import Login from "./components/Login";
import Settings from "./components/Settings";
import Intro from "./components/Intro";
import Register from "./components/Register";
import Routes from "./components/Dashboard";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import StressScreen1 from './components/stress/screen1Stress'
import StressScreen2 from './components/stress/screen2Stress'
import StressScreen3 from './components/stress/screen3Stress'
import SadScreen1 from './components/sadness/screen1Sad'
import SadScreen2 from './components/sadness/screen2Sad'
import SadScreen3 from './components/sadness/screen3Sad'
import AngerScreen1 from './components/Anger/AngerScreen1'
import AngerScreen2 from './components/Anger/AngerScreen2'
import AngerScreen3 from './components/Anger/AngerScreen3'
import videoGame from './components/sadness/videoGame'
import { Ionicons } from "@expo/vector-icons";

//creating stack and drawer navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
//add more as needed only if the screens can be opened with the drawer
function tabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "ios-home";
          } else if (route.name === "Settings") {
            iconName = "ios-settings";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={25} color={"white"} />;
        },
      })}
      tabBarOptions={{
        activeBackgroundColor: "#E55B46",
        inactiveBackgroundColor: "#E55B46",
        opacity: 0.1,
        activeTintColor: "#FFFFFF",
        inactiveTintColor: "#FFFFFF",
        style: {
          backgroundColor: "#E55B46",
          position: "absolute",
          height: Platform.select({
            ios: () => 80,
            android: () => 55,
          })(),
          left: 0,
          bottom: 0,
          right: 0,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen name="Dashboard" component={Routes}/>
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

//used to customize the header
const myOptions = {
  headerStyle: {
    shadowColor: "transparent",
    activeBackgroundColor: "#FFFFFF",
    shadowOffset: {
      height: 0,
    },
  },
};
//const { navigate } = this.props.navigation;
//Consists of Stack Navigator with all the screens and drawer navigator nested inside
const App = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="loadingScreen"
        component={Intro}
        options={{
          ...myOptions,
          headerShown: false,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="screen1Stress"
        component={StressScreen1}
        options={{
          ...myOptions,
          headerShown: false,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="screen2Stress"
        component={StressScreen2}
        options={{
          ...myOptions,
          headerShown: false,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="screen3Stress"
        component={StressScreen3}
        options={{
          ...myOptions,
          headerShown: false,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="screen1Sad"
        component={SadScreen1}
        options={{
          ...myOptions,
          headerShown: false,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="screen2Sad"
        component={SadScreen2}
        options={{
          ...myOptions,
          headerShown: false,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="screen3Sad"
        component={SadScreen3}
        options={{
          ...myOptions,
          headerShown: false,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="videoGameScreen"
        component={videoGame}
        options={{
          ...myOptions,
          headerShown: false,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="AngerScreen1"
        component={AngerScreen1}
        options={{
          ...myOptions,
          headerShown: false,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="AngerScreen2"
        component={AngerScreen2}
        options={{
          ...myOptions,
          headerShown: false,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="AngerScreen3"
        component={AngerScreen3}
        options={{
          ...myOptions,
          headerShown: false,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="loginScreen"
        component={Login}
        options={{
          ...myOptions,
          headerShown: false,
          headerLeft: null,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="registerScreen"
        component={Register}
        options={{
          ...myOptions,
          headerShown: false,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            opacity: 0.8,
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="routesScreen"
        component={Routes}
        options={{
          ...myOptions,
          headerShown: false,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            opacity: 0.8,
            shadowColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="main"
        component={tabNavigator}
        options={{
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#E55B46",
            opacity: 0.8
          },
          headerLeft: null,
          headerTitle: 'Home'
        }}
      />
    </Stack.Navigator>
  );
};
//export the navigation
export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
