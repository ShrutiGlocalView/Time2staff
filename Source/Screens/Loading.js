import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_role: '',
    }

  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    const email = await AsyncStorage.getItem('User_Email')
    const user_id = await AsyncStorage.getItem('User_Id')
    const user_role = await AsyncStorage.getItem('User_Role')
    console.log("email here:::");
    // console.log(email);
    // console.log(user_id);
    console.log(user_role);
    this.setState({
      user_role: user_role
    })
    console.log(this.state.user_role);
  }

  render() {
    if (this.state.user_role == "Client") {
      return (
        // <View style={styles.container}>
        //   {/* <ActivityIndicator /> */}
        //   {/* {alert("Hello Client...")} */}
        this.props.navigation.navigate('App')
        // </View>
      );
    }
    else if (this.state.user_role == "Staff") {
      // else {
      return (
        // <View style={styles.container}>
        //   {/* <ActivityIndicator /> */}
        //   {alert("Hello Staff...")}
        this.props.navigation.navigate('Auth')
        // </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    // height: '100%',
    // backgroundColor: '#D4cdb1',
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});
