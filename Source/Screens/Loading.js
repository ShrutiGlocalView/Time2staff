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
    // const email = await AsyncStorage.getItem('User_Email')
    // const user_id = await AsyncStorage.getItem('User_Id')
    var user_role = await AsyncStorage.getItem('User_Role')
    // console.log("email here:::");
    // console.log(email);
    // console.log(user_id);
    // console.log(user_role);
    this.setState({
      user_role: user_role
    })
    console.log(this.state.user_role);
  }

  render() {
    switch (this.state.user_role) {
      case "Client":
        this.props.navigation.navigate('ClientDrawer')
        break;

      case "Staff":
        this.props.navigation.navigate('StaffDrawer')
        break;
    }

    return (
      <View>
        <ActivityIndicator />
      </View>
    )
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
