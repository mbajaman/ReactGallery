import React, {Component} from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import GalleryScreen from '../screens/GalleryScreen'; //Gallery screen allows import from local gallery, facebook profile picture and camera.

export const MainStack = StackNavigator({ //Top level stack navigation
	Home: {
		screen: HomeScreen,
		},
	Gallery: {
		screen: GalleryScreen,
		},
	},	
{
	mode: 'modal',
	headerMode: 'none',
});
