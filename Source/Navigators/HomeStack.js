import React from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import HomeList from '../Screens/HomeList';
import HomeMap from '../Screens/HomeMap';

  const HomeStack = createStackNavigator({
    HomeList:{
      screen:HomeList
    },
    HomeMap:{
      screen:HomeMap
    },

   },{
    initialRouteName:'HomeList',
    headerMode:'none'
   });

export default HomeStack;
