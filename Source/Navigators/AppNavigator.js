import React from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import IntroductionPage from '../Screens/IntroductionPage';
import LoginPage from '../Screens/LoginPage';

  const AppNavigator = createStackNavigator({
    IntroductionPage:{
      screen:IntroductionPage
    },
    Login:{
      screen:LoginPage
    }

   },{
    headerMode:'none'
   });

export default AppNavigator;
