import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	View,
	StatusBar,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions,
	Alert,
	ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { ImagePicker } from 'expo';

//Gallery screen
export default class GalleryScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			photos: [],
			token: 'EAAVvv0QxeqMBAKhoMfj39ODcK8jHtZA7XUrI4DRsVTVfE2IaNk7ZA7W4IEYSrbLirBZCbwIhrfc4nsD9xNHvhsEVDRPoHUhN1aHFOZC6EjOPPpvb5NJ2IZBqDhZCD5yzZCFKKgKRLI5FJYdDUG3kj1sYBflV0ttb8CUewtrs5TZCZA0pW1VcLgrljVZBFbzrFgVu7kvyL3uqfZBg5dkivuesgFM',
			fbImage: require('../assets/placeholder.png'),
		};
	}

	static defaultProps = { //dedault properties are good to have. Good code!
		pic: {
			url:require('../assets/placeholder.png')
		}
	}

	//Login Function
	async logIn() { //Facebook login with async. User can login and token is stored in state for future api calls.
		  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1530242157083299', {
		      permissions: ['public_profile'],
		    });
		  if (type === 'success') {
		  	this.setState({
		  		token: token
		  	});

		    // Get the user's name using Facebook's Graph API
		    const response = await fetch(
		      `https://graph.facebook.com/me?access_token=${token}`);
		    Alert.alert( //An alert is shown to verify user login
		      'Logged in!',
		      `Hi ${(await response.json()).name}!`,
		    );
		  }
		  console.log(this.state.token);
		}

	//Fetch function from Facebook Graph API
	async fbFetchPhoto(){ //Api call is used to fetch user's profile picture and is then displayed in gallery.
		    await fetch(
		      `https://graph.facebook.com/me?fields=name,picture.type(large)&access_token=${this.state.token}`)
			.then((response) => response.json())
			.then((response) => {
				this.setState({
					fbImage: {uri: response.picture.data.url }
				});
			})
			console.log(this.state.fbImage);
	}

	//Gallery image picker to choose image from local files.
	_pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true, //Allows cropping and rotation.
			aspect: [5, 5], //Sets cropping ratios.
		});

		if(!result.cancelled) {
			this.state.photos.push(result) // adds image to array 'photo'.
			this.setState({
				photos: this.state.photos //updates state.photo with new image.
			});
		}
	};

	//Allows user to take a photo with Camera and add it to array 'photos' (state.photos).
	_takePhoto = async () => {
		console.log(this.state.token);
		let result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [5, 5],
			quality: 1,
		});

		if(!result.cancelled) {
			this.state.photos.push(result) // adds image to array 'photo'.
			this.setState({
				photos: this.state.photos //updates state.photo with new image.
			});
		}
	};

	render(){
		const width = Dimensions.get('window'); //Dynamic scaling for various devices.

		return(
			<View>
				<View style={styles.topContainer}>
					<StatusBar hidden= {true} />
					<Text style={styles.topText}> Gallery </Text>
				</View>

				<View style = {styles.icons}>
					<Icon.Button
						name="plus" 
						size= {22}
						backgroundColor="#663399"
						onPress={ this._pickImage } />	
					<Icon.Button
						name="camera" 
						size= {22}
						backgroundColor="#663399"
						onPress={ this._takePhoto } />					
					<Icon.Button
						name="facebook" 
						backgroundColor="#663399"
						onPress={ this.logIn.bind(this) } />
				</View>

				<View style={styles.container}>
					<ScrollView
						contentContainerStyle = {styles.scrollView}
						>

						<TouchableOpacity onPress={ this.fbFetchPhoto.bind(this) } >
						{this.state.fbImage ? (
							<Image 
							style={styles.image}
							source={this.state.fbImage}
	                         />
							) : null }
							
                         </TouchableOpacity> 

						{this.state.photos.map(function(p, index) {
							return(
								<TouchableOpacity key={index}>
									<Image 
									style={styles.image}
									source={{uri: p.uri}}
									key={index}
			                         />
		                         </TouchableOpacity>
							)
						})
						}
					</ScrollView>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
	height: '100%',
	width: '100%',
    backgroundColor: '#000',
  },
  topContainer: {
  	height:50,
  	backgroundColor: "#663399",
  },
  topText: {
  	fontWeight: "600",
  	fontSize: 24,
  	color: "#FFFFFF",
  	margin:10,
  },
  icons:{
  	flexDirection:'row',
  	position: 'absolute',
  	top:0,
  	right:0,
  	marginTop:10,
  	marginRight:0,
  },
  image: {
  	height: (Dimensions.get('window').height/3) - 12,
  	width: (Dimensions.get('window').width/2) - 2,
  	margin: 1,
  },
  scrollView: {
  	flexWrap: 'wrap',
  	flexDirection: 'row',
  },
});

