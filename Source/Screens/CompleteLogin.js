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
import PhoneInput from 'react-native-phone-input'
import InputField from '../Components/InputField';
import SaveProfile from '../Controller/SaveProfile';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CompleteLogin extends Component {
  constructor(props) {
    super(props);
    this.state={
        firstName:'',
        lastName:'',
        sex:'M',
        dateOfBirth:'',
        address:'',
        zipcode:'',
        city:'',
        email:'',
        phoneNumber:'',
        countries:[],
        visible: false,
        emailError:'',
        textError: '', 
        gender: ['Male', 'Female'],
        checked: 0       
    }
  }

  componentDidMount() {
       this.loadCountryDetails();
  }

   validate=(text)=>{
    var validate = true;
    const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(mailReg.test(text) === false){
      
      this.setState({emailError:'Enter a valid email'});
      validate = false;
    }
    if(this.state.firstName == ''){
      
      this.setState({textError:'Mandatory Field'});
      validate = false
    }
    if(this.state.phoneNumber == '' || this.state.phoneNumber.length < 10 || this.state.phoneNumber.length > 10){

      this.setState({phoneError:'Invalid Number'});
      validate = false
    }

    return validate
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

  _renderAddressInput=(label,onChangeText,errorMessage,secureTextEntry)=>{
    //console.log(label,errorMessage);
    return(<View>
      <FormLabel labelStyle={styles.labelStyle}>{label}</FormLabel>
      <FormInput onChangeText = {(text)=>{onChangeText(text)}}
                 placeholder = {label}
                 placeholderTextColor = 'grey'      
                 multiline = {true}
                 numberOfLines = {4}           
                 containerStyle = {styles.addressInputStyle}
                  />
      <FormValidationMessage>{errorMessage}</FormValidationMessage>           

      </View>
      )
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

  onSelect = () => {
    alert("pressed...")
  }

   showDatePicker = async()=>{
     try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          // Use `new Date()` for current date.
          // May 25 2020. Month 0 is January.
          date: new Date()
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          var date = year+'-'+(month+1)+'-'+day;
          this.setState({dateOfBirth:date})
        }
      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
      }      
   }


  saveDetails = async()=>{
     var response = await SaveProfile.personalInfo(this.state.firstName,this.state.lastName,this.state.sex,this.state.dateOfBirth,this.state.country,'kjdkjd','dhfkefj','wjdqwi',this.state.address,this.state.zipcode,this.state.city,this.state.phoneNumber,'efhwefhw')
     console.log(response);
   }

  render() {
    return (
        <ScrollView contentContainerStyle = {styles.container}>
          {this._renderTextInput('First Name',
                                  (text)=>{this.setState({firstName:text})
                                          },
                                  this.state.textError,
                                  false)}
          {this._renderTextInput('Last Name',
                                  (text)=>{this.setState({lastName:text})
                                          },
                                  this.state.textError,
                                  false)
                                  }

          {this._renderTextInput('Email',
                                  (text)=>{this.setState({email:text})
                                          },
                                  this.state.emailError,
                                  false)}
          
          <View>
            < FormLabel labelStyle={styles.labelStyle}>Contact</FormLabel>
            <PhoneInput
                style = {styles.phoneInputStyle}
                textStyle = {{color: 'grey'}}
                
                ref='phone'/>
          </View>

          <View style = {{flexDirection:'row', alignItems: 'center',}}>
            <FormLabel labelStyle = {styles.genderStyle}>Gender</FormLabel>
            {this.state.gender.map((data, key) => {
                return (
                    <View style = {{width:100,}}
                    key={key}>
                        {this.state.checked == key ?
                            <TouchableOpacity style={styles.btn}>
                                <Image style={styles.img} source={require("../../Assets/btnSelected.png")}/>
                                <Text style = {{marginTop: 14,}}>{data}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>{this.setState({checked: key})}} style={styles.btn}>
                                <Image style={styles.img} source={require("../../Assets/btn.png")} />
                                <Text style = {{marginTop: 14}}>{data}</Text>
                            </TouchableOpacity>
            }
                    </View>
                    
                )
            })}
          </View>

            <View style = {{flexDirection:'row', alignItems: 'center',}}>
            <FormLabel labelStyle = {styles.labelStyle }>DOB</FormLabel>
            <TouchableOpacity onPress={()=>this.showDatePicker()}style={{ height: '100%',}}>
              <View style = {{flexDirection:'row'}}>
              <FormInput onChangeText = {(text)=>{this.setState({dateOfBirth:text})}}
                                 containerStyle = {{ marginTop: 14, width: '45%', paddingRight: 8, }}
                                 editable={false}
                                 placeholder = 'yyyy-mm-dd'
                                 placeholderTextColor = 'grey'
                                 value = {this.state.dateOfBirth}
                                 />
               <Icon name="ios-calendar" color="#4F8EF7" size= {32} style= {{paddingTop: 22, paddingLeft: 10}} /> 
                </View>
            </TouchableOpacity>
          </View>

          {this._renderAddressInput('Address',
                                  (text)=>{this.setState({address:text})
                                          },
                                  this.state.textError,
                                  false)}
          
          {this._renderTextInput('City/Region',
                                  (text)=>{this.setState({city:text})
                                          },
                                  this.state.textError,
                                  false)}

          <FormLabel labelStyle = {styles.labelStyle}>Select a Country</FormLabel>

          <TouchableOpacity onPress={()=>this.setState({visible:true})}
                            style={{marginRight:16,width:'45%'}}>
              <FormInput 
                                 editable={false}
                                 placeholder = 'Country'
                                 placeholderTextColor = 'grey'
                                 borderBottomColor = 'blue'
                                 containerStyle = {{backgroundColor:'transparent', borderColor: 'blue'}}
                                 value = 'country'
                                 />
            </TouchableOpacity> 
          <ModalFilterPicker
              visible = {this.state.visible}
                onSelect = {(picked)=>{  console.log(picked);
									   var selectedValue = this.state.countries[--picked];
									   this.setState({country:selectedValue});
									   console.log(this.state.country);
									   console.log(this.state.country);
                                   }}
              onCancel = {()=>this.setState({visible:false})}
              options = {this.state.countries}
              selectedOption = '0' 
          />
          
          {this._renderTextInput('Zip Code',
          (text)=>{this.setState({zipcode:text})
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
  genderStyle:{
    color:'#265b91',
    fontSize:18,
    marginTop:14,
    marginBottom:0,
    marginLeft:18,
    marginRight:14,
    flexDirection:'column'
  },
  picker:{
    width:'25%',
    height: '50%',
    marginTop: 15,
    backgroundColor:'transparent',
  },
  pickerItem:{
	padding: 10,
    marginTop: 2,
    backgroundColor: '#ddd',
	borderColor: '#bbb',
	borderWidth: 1,
	borderRadius:5
  },
  countryTextInput:{
				padding: 12,
				borderWidth: 1,
				borderColor: '#ccc',
				borderRadius: 5
  },
  itemTextStyle:{
			color: '#222'
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
  addressInputStyle: {
    borderBottomColor: '#265b91', 
    borderBottomWidth: 2,
     padding: 0, 
     margin: 0,
     borderWidth: 0,
     backgroundColor: '#fff9c4'
  },
  phoneInputStyle:{
    marginLeft: 18, 
    marginRight:18, 
    marginTop: 10, 
    paddingBottom: 10,
    paddingLeft:2, 
    borderBottomWidth: 2, 
    borderBottomColor: '#265b91',
    color: 'grey'
  },
  img:{
    height:20,
    width: 20,
    marginTop: 14
  },
  btn:{
      flexDirection: 'row',
      marginRight: 4
  }
    
});