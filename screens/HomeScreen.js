import React, {Component} from 'react';
import { Animated, Dimensions, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Expo from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

const videoSource = require('../assets/wave.mp4') //video background.

//Login Screen
export default class HomeScreen extends Component { 
	state = {
	    loaded: false,
	    backgroundOpacity: new Animated.Value(0),
	  }

	async componentWillMount() { //waits for video to load
    await Expo.Asset.fromModule(videoSource).downloadAsync();
    this.setState({loaded: true});
  }

  _fadeInVideo = () => { //animation effect
    setTimeout(() => {
      Animated.spring(this.state.backgroundOpacity, {toValue: 1}).start()
    }, 500);
  }

  _handleVideoRef(videoRef) { 
     videoRef.loadAsync(videoSource, {
       shouldPlay: true,
       isLooping: true,
     });
 
     this.videoRef = videoRef;
   }

  render() { //renders video in background and places other elements on top
  	const {navigate} = this.props.navigation;

  	if (!this.state.loaded) {
      return <Expo.AppLoading />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <Animated.View style={[styles.backgroundViewWrapper, {opacity: this.state.backgroundOpacity}]}>
            <Expo.Video
              style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
              resizeMode="cover"
              ref={this._handleVideoRef}
              onLoad={this._fadeInVideo}
            />
          </Animated.View>
        </View>
        	<Image style={styles.logo} source={require('../assets/wave-logo.png')} />
        <View>

		<View style={styles.loginContainer}>
        	<TouchableOpacity  
        		style = {styles.buttonContainer}
        		onPress={() => navigate('Gallery')}>
        		<Text style={styles.buttonText}> Next > </Text>
        	</TouchableOpacity>
		</View>
        </View>
      </View>
    );
  }

}

//Stylesheet for elements above.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  logo: {
  	marginBottom: 50,
  	width: 360,
  	height: 100,
  	resizeMode: 'cover',
  },
  loginContainer: {
  	margin: 10,
  },
  button:{
  	width: 250
  },
  buttonContainer:{
  	padding: 10,
  	backgroundColor: '#4A148C',
  	opacity: 0.8
  },
 buttonText: {
 	textAlign: 'center',
 	color: '#FFFFFF',
 	fontWeight: '700',
 }

});
Expo.registerRootComponent(HomeScreen);

