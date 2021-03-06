import React, {Component} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {Icon} from 'native-base';
import {createAppContainer} from 'react-navigation';
import { createMaterialTopTabNavigator} from 'react-navigation-tabs';

import HomeTab from './appTabNavigator/HomeTab';
import SearchTab from './appTabNavigator/SearchTab';
import AddMediaTab from './appTabNavigator/AddMediaTab';
import LinkesTab from './appTabNavigator/LinkesTab';
import ProfileTab from './appTabNavigator/ProfileTab';

const AppTabNavigator = createMaterialTopTabNavigator({
  HomeTab: { screen: HomeTab },
  SearchTab: { screen: SearchTab },
  AddMediaTab: { screen: AddMediaTab },
  LinkesTab: { screen: LinkesTab },
  ProfileTab: { screen: ProfileTab },
},{
  swipeEnabled: true,
  tabBarPosition: "bottom",
  tabBarOptions:{
    style: {
      ...Platform.select({
        ios:{
          backgroundColor: 'white',
        },
        android: {
          backgroundColor: 'white',
        },
      })
    },
    ...Platform.select({
      android:{
        bounces: true,
      },
    }),
    upperCaseLabel: false,
    showIcon: true,
    showLabel: false,
    iconStyle: { height: 50 },
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
  },
})

const AppTabContainer = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component{

  static navigationOptions = {
    header: null,
  }

  render(){
    console.log('MainScreen:',this.props)
    return(
      <AppTabContainer />
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})