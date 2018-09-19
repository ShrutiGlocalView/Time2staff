import React from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import IntroductionPage from '../Screens/IntroductionPage';
import LoginScreen from '../Screens/LoginScreenNew2';

  const AuthNavigator = createStackNavigator({
    
    LoginScreen:{
      screen:LoginScreen
    },

   },{
    initialRouteName:'LoginScreen', 
    headerMode:'none'
   });

export default AuthNavigator;
