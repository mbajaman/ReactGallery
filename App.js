import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import Expo from 'expo';
import { MainStack } from './navigator/nav'; //Navigation Control
import HomeScreen from './screens/HomeScreen'; //Home-Login Screen

const videoSource = require('./assets/wave.mp4')

export default class App extends React.Component {

  render() {
    return (
      <MainStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    width:'100%',
  },
});
Expo.registerRootComponent(App);