import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
	Text, 
	View, 
	StatusBar, 
	StyleSheet, 
	Image, 
	ActivityIndicator, 
	TouchableOpacity, 
	CameraRoll, 
	Dimensions, 
	ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { ImagePicker } from 'expo';


export default class GalleryScreen extends Component {

	constructor() {
		super();
		this.state = {
			image: null,
			photos: [],
			index: null,
		}
	}

	setIndex = (index) => {
		if (index === this.state.index) {
			index = null
		}
		this.setState({index})
	}

	getPhotos = () => {
		CameraRoll.getPhotos({
			first: 20,
			assetType: 'All'
		})
		.then(r => this.setState({
			photos: r.edges
		}))
	}

	toggleModal = () => {
		this.setState({ modalVisisble: !this.state.modalVisisble})
	}

	share = () => {
		const image = this.state.photos[this.state.index].node.image.url
		/*RNFetchBlob.fs.readFile(image, 'base64')
		.then((data) => {
			const shareOptions = {
				title: 'React Native Share Example',
				message: 'Check out this photo',
				url: 'data:image/jpg;base64,${data}',
				subject: 'Check out this photo'
			}
			Share.open(shareOptions)
				.then(res => console.log('success!', res'))
				.catch(err => console.log('error!', err))
		})
		*/
	}

	_pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [5, 5],
		});

		console.log(result);

		if(!result.cancelled) {
			this.setState({
				image: result.uri
			});
		}
	};

	render(){
		let {image} = this.state;

		return(
			<View>
				<View style={styles.topContainer}>
					<StatusBar hidden= {true} />
					<Text style={styles.topText}> Gallery </Text>
				</View>

				<View style = {styles.camera}>
					<Icon.Button
						name="camera" 
						size= {22}
						backgroundColor="#663399"
						onPress={this._pickImage} />					
					<Icon.Button
						name="dots-three-vertical" 
						backgroundColor="#663399"/>
				</View>

				<View style={styles.container}>
					{!image && <ActivityIndicator />}
					{image &&
						<TouchableOpacity
								style={styles.image}
								onPress={this._editImage}
							>
							<Image source={{
								uri: image
							}} style = {{
								width: 200,
								height: 200
							}} />
						</TouchableOpacity>}
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
  	margin: 3,
  },
});

