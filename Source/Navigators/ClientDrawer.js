import React from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';
import {
  createDrawerNavigator,
} from 'react-navigation';
import HomePage from '../Screens/HomePage';
import Profile from '../Screens/Profile';

  const ClientDrawer = createDrawerNavigator({
       Home:HomePage,
       Profile:Profile
    },{
      headerMode:'none',
      initialRouteName:'Profile'
    });

export default ClientDrawer;