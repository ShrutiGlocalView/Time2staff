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
  Text,
  AsyncStorage
} from 'react-native';
import {Avatar,Button,FormLabel,FormInput, FormValidationMessage} from 'react-native-elements';
import ModalFilterPicker from 'react-native-modal-filter-picker';

import InputField from '../Components/InputField';


export default class BillingInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taxCountry : '',
      taxPercent : '',
      idNumber : '',
      bankAccount: '',
      textError : '',
      visible : false,
      countries:[]
    }
  }

  componentDidMount() {
    this.loadCountryDetails();

   }

   _renderTextInput=(label,onChangeText,errorMessage,secureTextEntry)=>{
    //console.log(label,errorMessage);
    return(<View>
      <FormLabel labelStyle={styles.labelStyle}>{label}</FormLabel>
      <FormInput onChangeText = {(text)=>{onChangeText(text)}}
                 placeholder = {label}
                 placeholderTextColor = 'grey'
                 containerStyle = {styles.textInputStyle} />
      <FormValidationMessage>{errorMessage}</FormValidationMessage>           

      </View>
      )
  }

  validate=(text)=>{
    var validate = true;
    if(this.state.taxCountry == ''){
      
      this.setState({textError:'Mandatory Field'});
      validate = false
    }
    if(this.state.taxPercent == '' ){
      this.setState({textError:'Invalid Number'});
      validate = false
    }
    if(this.state.idNumber == ''){
      
      this.setState({textError:'Mandatory Field'});
      validate = false
    }
    if(this.state.bankAccount == ''){
      
      this.setState({textError:'Mandatory Field'});
      validate = false
    }

    return validate
  }

  saveDetails = ()=>{
    alert("you pressed it!!!")
  }

  loadCountryDetails = async()=>{
    var list=[];
    var countries = await AsyncStorage.getItem('Countries');
    countries = JSON.parse(countries); 
    countries.forEach((item,index)=>{
      list.push({key:item.id,label:item.name})
    })
    this.setState({countries:list});
  }

  render() {
    return (
        <ScrollView contentContainerStyle = {styles.container}>
          <FormLabel labelStyle = {styles.labelStyle}>Select a Tax Country</FormLabel>
              <TouchableOpacity onPress={()=>this.setState({visible:true})}
                                style={{width: '50%', borderBottomColor: '#265b91',  
                                borderBottomWidth: 2,
                                 padding: 0, 
                                 marginLeft: 10 }}>
                  <FormInput 
                                    editable={false}
                                    placeholder = 'Tax Country'
                                    placeholderTextColor = 'grey'
                                    borderBottomColor = 'blue'
                                    // containerStyle = {{backgroundColor:'transparent', borderColor: 'blue'}}
                                    />
              </TouchableOpacity>    
              <ModalFilterPicker
                  visible = {this.state.visible}
                  onSelect = {(picked)=>{  console.log(picked);
                        var selectedValue = this.state.countries[--picked];
                        this.setState({country:selectedValue});
                        console.log(this.state.country);
                        alert(this.state.country);
                                      }}
                  onCancel = {()=>this.setState({visible:false})}
                  options = {this.state.countries}
                  selectedOption = '0' 
              />
           {/* {this._renderTextInput('Tax Country',
                                  (text)=>{this.setState({taxCountry:text})
                                          },
                                  this.state.textError,
                                  false)} */}
          {this._renderTextInput('Tax Percentage',
                                  (text)=>{this.setState({taxPercent:text})
                                          },
                                  this.state.percentError,
                                  false)
                                  }
          {this._renderTextInput('ID number',
                                  (text)=>{this.setState({idNumber:text})
                                          },
                                  this.state.textError,
                                  false)}
         {this._renderTextInput('Bank Account',
                                  (text)=>{this.setState({bankAccount:text})
                                          },
                                  this.state.textError,
                                  false)}

          <Button rounded
                  raised
                  large
                  containerViewStyle={styles.buttonContainer}
                  title = 'Submit'
                  buttonStyle={[styles.button,{backgroundColor: "#265b91"}]}
                  textStyle = {{color:'white',
                                fontSize:25}}
                  onPress = {()=> {if(this.validate())
                                      this.saveDetails()
                                  }
                              }              
          />

        </ScrollView>)
  }
}

const styles= StyleSheet.create({
  container: {
   
    backgroundColor: '#D4cdb1',
   
    
  },
  logo:{
    height:'40%',
    width:'40%',
  },
  button:{
    height:60,
    borderRadius:30,
    marginBottom: 50
},
buttonContainer:{backgroundColor: "transparent",
marginTop: 20,
width:'90%'
},
  signIn:{color:'#265b91',
               fontSize:20,
               textDecorationLine:'underline'
  },
  picker:{
    width:'25%',
    backgroundColor:'white',
    marginHorizontal:0,
    marginVertical:0
  },
  labelStyle:{
    margin: 0,
    padding: 0,
    color:'#265b91',
    fontSize:18
  },
  textInputStyle: {
    borderBottomColor: '#265b91', 
    borderBottomWidth: 2,
     padding: 0, 
     margin: 0

  },
  
});
//             <TouchableOpacity style = {{height:30,width:'25%',backgroundColor:'red'}}
//                               onPress = {()=>this.showDatePicker()}/>