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
import Loading from '../Screens/Loading';

  const RootNavigator = createSwitchNavigator({
    Authloading:Loading,
      App:AppNavigator,
      Auth:AuthNavigator
    },{
      initialRouteName:'Auth'
    });

export default RootNavigator;
