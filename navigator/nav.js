import React, {Component} from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import GalleryScreen from '../screens/GalleryScreen';

export const MainStack = StackNavigator({
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
