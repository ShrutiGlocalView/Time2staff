/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import RootNavigator from './Source/Navigators/RootNavigator';

export default class App extends Component<Props> {
  render() {
    return (<RootNavigator/>);
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D4cdb1',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
