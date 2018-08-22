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

  const RootNavigator = createSwitchNavigator({
      AuthLoading:SplashScreen,
      App:AppNavigator,
      Auth:AuthNavigator
    },{
      initialRouteName:'AuthLoading'
    });

export default RootNavigator;
