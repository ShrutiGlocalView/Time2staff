import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Linking,
  DatePickerAndroid,
  Picker,
  ScrollView,
  Text
} from 'react-native';
import {Avatar,Button,FormLabel} from 'react-native-elements';
import InputField from '../Components/InputField';
import ProfileTab from '../Navigators/ProfileTab';
//import ImagePicker from 'react-native-image-picker';
var ImagePicker = require('react-native-image-picker');
export default class IntroductionPage extends Component {
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

   showDatePicker = async()=>{
     try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          // Use `new Date()` for current date.
          // May 25 2020. Month 0 is January.
          date: new Date(2020, 4, 25)
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          console.log(year+' '+month+' '+day);
        }
      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
      }

      
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
          <View style={{height:'100%',width:'100%'}}>        
          <ProfileTab/>
        </View>               

        </View>)
  }
}

const styles= StyleSheet.create({
  container: {
    paddingTop:32,
    paddingBottom:32,
    backgroundColor: '#D4cdb1',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%'
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
  },
  labelStyle:{
    color:'#265b91',
    fontSize:18
  }
});
