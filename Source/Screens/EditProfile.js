import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import ProfileTab from '../Navigators/ProfileTab';
//import ImagePicker from 'react-native-image-picker';
var ImagePicker = require('react-native-image-picker');
//Not in use right now but can be used in future for 
export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state={
        avatarSource:'', 
        firstName:'',
        lastName:'',
        sex:'M',
        dateOfBirth:'',
        address:'',
        zipcode:'',
        country:'',
        city:'',
        email:'',
        phoneNumber:'',
    }
  }

  componentDidMount() {
      
   }

  onAvatarClick = ()=>{
      var options = {
          title: 'Select Avatar',
          customButtons: [
            {name: 'fb', title: 'Choose Photo from Facebook'},
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        }

      ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  } 

  render() {
    return (
        <View style = {styles.container}>
          <Avatar
                      large
                      rounded
                      source = {this.state.avatarSource}
                      onPress={() => this.onAvatarClick()}
                      activeOpacity={0.7}
          />
          <View style={{height:'100%',width:'100%',}}>        
          <ProfileTab/>
        </View>               

        </View>
        )
  }
}

const styles= StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom:32,
    backgroundColor: '#F57F17',
    // backgroundColor: '#D4cdb1',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%'
  }
});

