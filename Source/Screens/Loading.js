import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

export default class Loading extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
      //{backgroundColor: "#265b91"},
      //{backgroundColor: "white"},
  }

  render() {
    return (
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>)
  }
}

const styles= StyleSheet.create({
  container: {
    height:'100%',
    backgroundColor: '#D4cdb1',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
