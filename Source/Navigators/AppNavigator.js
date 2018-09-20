import React from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';
import {
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';

import LoginPage from '../Screens/LoginPage';
import HomePage from '../Screens/HomePage';
import Profile from '../Screens/Profile';
import CompleteProfileNavigator from './CompleteProfileNavigator';
  const AppNavigator = createDrawerNavigator({
       Home:HomePage,
       CompleteProfileNavigator:CompleteProfileNavigator
    },{
      headerMode:'none',
      initialRouteName:'CompleteProfileNavigator'
    });

export default AppNavigator;
