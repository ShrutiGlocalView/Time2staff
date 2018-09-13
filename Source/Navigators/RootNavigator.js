import React from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';
import {
  createSwitchNavigator,
} from 'react-navigation';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import SplashScreen from '../Screens/SplashScreen';
import CompleteProfileNavigator from './CompleteProfileNavigator';

  const RootNavigator = createSwitchNavigator({
      AuthLoading:SplashScreen,
      // App:AppNavigator,
      App:CompleteProfileNavigator,
      Auth:AuthNavigator
    },{
      initialRouteName:'AuthLoading'
    });

export default RootNavigator;
