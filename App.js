import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';

import RootNavigator from './Source/Navigators/RootNavigator';

export default class App extends Component{
  constructor(props) {
    super(props);

  }
  render() {
    return (<RootNavigator/>);
  }
}


