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
  },
  logo:{
    height:'40%',
    width:'40%',
  },
  button:{
      height:60,
      borderRadius:30
  },
  buttonContainer:{backgroundColor: "transparent",
    marginTop: 20,
    width:'90%'
  },
  signIn:{color:'#265b91',
               fontSize:20,
               textDecorationLine:'underline'
  }
});
