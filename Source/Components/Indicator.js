import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,  
  View,
} from 'react-native'

export default class Indicator extends Component {
  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', flex: 1}}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})