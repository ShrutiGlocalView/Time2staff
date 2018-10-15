import React from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import LoginScreen from '../Screens/LoginScreenNew2';
import CompleteProfileNavigator from './CompleteProfileNavigator'
  const AuthNavigator = createStackNavigator({
    LoginScreen:{
      screen:LoginScreen
    },
    // CompleteProfileNavigator: {
    //   screen: CompleteProfileNavigator
    // }
   },{
    initialRouteName:'LoginScreen', 
    headerMode:'none'
   });

export default AuthNavigator;
