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
import {Avatar,Button,FormLabel,FormInput} from 'react-native-elements';
import InputField from '../Components/InputField';


export default class BillingInfo extends Component {
  constructor(props) {
    super(props);
    this.state={
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

   

  render() {
    return (
        <ScrollView contentContainerStyle = {styles.container}>
         
          <InputField label='Tax Country'
                      errorMessage = 'Mandatory field'
                      placeholder = 'Enter first Name'
                      onChangeText = {(text)=>{this.setState({firstName:text})
                                               console.log(this.state.firstName)}
                                     }
                                     
          />

          <InputField label='Tax Percentage'
                      errorMessage = 'Mandatory field'
                      placeholder = 'Enter last Name'
                      onChangeText = {(text)=>{this.setState({firstName:text})
                                               console.log(this.state.firstName)}
                                     }
                                     
          />
          

          <InputField label='ID'
                      errorMessage = 'Mandatory field'
                      placeholder = 'Enter Address'
                      onChangeText = {(text)=>{this.setState({firstName:text})
                                               console.log(this.state.firstName)}
                                     }
                                     
          />

          <InputField label='Bank Account'
                      errorMessage = 'Mandatory field'
                      placeholder = 'Enter Name'
                      onChangeText = {(text)=>{this.setState({firstName:text})
                                               console.log(this.state.firstName)}
                                     }
                                     
          />                

        </ScrollView>)
  }
}

const styles= StyleSheet.create({
  container: {
    padding:16,
    backgroundColor: '#D4cdb1',
    justifyContent: 'center',
    alignItems: 'center',
    
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
    fontSize:18,
    marginTop:0,marginBottom:0,marginLeft:6,marginRight:6
  },
  picker:{
    width:'25%',
    backgroundColor:'white',
    marginHorizontal:0,
    marginVertical:0
  }
  
});
//             <TouchableOpacity style = {{height:30,width:'25%',backgroundColor:'red'}}
//                               onPress = {()=>this.showDatePicker()}/>