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

  const AuthNavigator = createStackNavigator({
    IntroductionPage:{
      screen:IntroductionPage
    },
    LoginPage:{
      screen:LoginPage
    }

   },{
    initialRouteName:'IntroductionPage', 
    headerMode:'none'
   });

export default AuthNavigator;
