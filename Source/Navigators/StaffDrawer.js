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
import PersonalInfo from '../Screens/PersonalInfo';
import StaffProfile from '../Screens/StaffProfile';

  const StaffDrawer = createDrawerNavigator({
       Home:HomePage,
       StaffProfile:StaffProfile
    },{
      headerMode:'none',
      initialRouteName:'StaffProfile'
    });

export default StaffDrawer;

// initial routname will be another class similar 
// to Profile.js named StaffProfile.js
// 
// rename Profile.js to ClientProfile.js