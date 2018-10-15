import React from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';
import {
  
  createDrawerNavigator
} from 'react-navigation';
import IntroductionPage from '../Screens/IntroductionPage';
import HomePage from '../Screens/HomePage';
import Profile from '../Screens/Profile';
  const AppNavigator = createDrawerNavigator({
       Home:HomePage,
       Profile:Profile
    },{
      headerMode:'none',
      initialRouteName:'Profile'
    });

export default AppNavigator;
