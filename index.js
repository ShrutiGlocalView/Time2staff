/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import IntroductionPage from './Source/Screens/Profile';
import HomePage from './Source/Screens/HomePage';
import LoginScreen from './Source/Screens/LoginScreenNew2';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? 
  GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

AppRegistry.registerComponent('Time2staff', () => LoginScreen);