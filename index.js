/** @format */

import {AppRegistry} from 'react-native';
import App from './App';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? 
  GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

AppRegistry.registerComponent('Time2staff', () => App);