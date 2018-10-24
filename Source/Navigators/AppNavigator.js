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

import ClientDrawer from '../Navigators/ClientDrawer';
import StaffDrawer from '../Navigators/StaffDrawer';
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
  App: ClientDrawer,
  Auth: StaffDrawer,
}, {
    initialRouteName: 'AuthLoading'
  });

export default AppNavigator;
