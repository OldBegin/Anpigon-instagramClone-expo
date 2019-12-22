import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, } from 'react-navigation-stack';

import MainScreen from './components/MainScreen';

const AppStackNavi = createStackNavigator({
  Main:{screen: MainScreen},

})

export default createAppContainer(AppStackNavi);