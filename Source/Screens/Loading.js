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
    var result = JSON.parse(await AsyncStorage.getItem('User_Data'))
    var user_role = result.roles[0].title
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
      <View style = {styles.container}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
