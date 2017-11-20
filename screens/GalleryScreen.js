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
	ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { ImagePicker } from 'expo';


export default class GalleryScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			photos: []
		};
	}

	_pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [5, 5],
		});

		if(!result.cancelled) {
			this.state.photos.push(result)
			this.setState({
				photos: this.state.photos
			});
			console.log(this.state.photos);
		}
	};

	_takePhoto = async () => {
		let result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [5, 5],
			quality: 1,
		});

		if(!result.cancelled) {
			this.state.photos.push(result)
			this.setState({
				photos: this.state.photos
			});
			console.log(this.state.photos);
		}
	};

	render(){
		const width = Dimensions.get('window');

		return(
			<View>
				<View style={styles.topContainer}>
					<StatusBar hidden= {true} />
					<Text style={styles.topText}> Gallery </Text>
				</View>

				<View style = {styles.camera}>
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
						name="dots-three-vertical" 
						backgroundColor="#663399"/>
				</View>

				<View style={styles.container}>
					<ScrollView
						contentContainerStyle = {styles.scrollView}
						>
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
  camera:{
  	flexDirection:'row',
  	position: 'absolute',
  	top:0,
  	right:0,
  	marginTop:10,
  },
  image: {
  	height: 200,
  	width: 200,
  	margin: 2,
  },
  scrollView: {
  	flexWrap: 'wrap',
  	flexDirection: 'row',
  },
});

