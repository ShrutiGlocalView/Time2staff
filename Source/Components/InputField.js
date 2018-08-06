import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Linking
} from 'react-native';

import { FormLabel, FormInput, FormValidationMessage,Button } from 'react-native-elements';

export default class InputField extends Component{
   constructor(props){
      super(props);
      
   }

   render(){
       return(<View>
                    <FormLabel labelStyle={styles.labelStyle}>{this.props.label}</FormLabel>
                    <FormInput onChangeText = {(text)=>{this.props.onChangeText(text)}}
                               secureTextEntry = {this.props.secureTextEntry}
                               placeholder = {this.props.placeholder}
                               placeholderTextColor = 'grey'
                               containerStyle = {{backgroundColor:'#ffffff'}}/>
                               

              </View>
      )
   }

}

//<FormValidationMessage>{this.props.errorMessage}</FormValidationMessage>
const styles = StyleSheet.create({
    labelStyle:{
    color:'#265b91',
    fontSize:18
  }
})