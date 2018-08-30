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
import CompleteLogin from '../Screens/CompleteLogin';
import Profile from '../Screens/Profile';
import AddNewSkills from '../Screens/AddNewSkills';

const AppNavigator = createStackNavigator({
       CompleteLogin:CompleteLogin,
       Profile:Profile,
    },{
      headerMode:'none',
      initialRouteName:'Profile'
    });

export default AppNavigator;
