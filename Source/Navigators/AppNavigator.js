import React from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';
import {
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import IntroductionPage from '../Screens/IntroductionPage';
import HomePage from '../Screens/HomePage';
import Profile from '../Screens/Profile';

import ClientDrawer from './ClientDrawer';
import StaffDrawer from './StaffDrawer';
import Loading from '../Screens/Loading';

// const AppNavigator = createDrawerNavigator({
//      Home:HomePage,
//      Profile:Profile
//   },{
//     headerMode:'none',
//     initialRouteName:'Profile'
//   });

const AppNavigator = createSwitchNavigator({
  AuthLoading: Loading,
  ClientDrawer: ClientDrawer,
  StaffDrawer: StaffDrawer,
}, {
    initialRouteName: 'AuthLoading'
  });

export default AppNavigator;
