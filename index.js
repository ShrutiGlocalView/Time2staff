/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import IntroductionPage from './Source/Screens/Profile';
import HomePage from './Source/Screens/HomePage';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? 
  GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

AppRegistry.registerComponent('Time2staff', () => App);
