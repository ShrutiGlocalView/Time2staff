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
import {Avatar,Button,FormLabel,FormInput} from 'react-native-elements';
import InputField from '../Components/InputField';
import SaveProfile from '../Controller/SaveProfile';
//import  SearchableDropdown from 'react-native-searchable-dropdown';
import ModalFilterPicker from 'react-native-modal-filter-picker'
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
        visible:false,
        
    }
  }

  componentDidMount() {
       this.loadCountryDetails();
       
   }
   
  loadCountryDetails = async()=>{
    var list=[];
    var countries = await AsyncStorage.getItem('Countries');
    countries = JSON.parse(countries); 
    countries.forEach((item,index)=>{
      list.push({key:item.id,label:item.name})
    })

    this.setState({countries:list});
    console.log(this.state.countries);


  }


   showDatePicker = async()=>{
     try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          // Use `new Date()` for current date.
          // May 25 2020. Month 0 is January.
          date: new Date(2020, 4, 25)
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          var date = year+'-'+month+'-'+day;
          this.setState({dateOfBirth:date})
        }
      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
      }

      
   }
//         firstName:'',
//         lastName:'',
//         sex:'M',
//         dateOfBirth:'',
//         address:'',
//         zipcode:'',
//         country:'',
//         city:'',
//         email:'',
//         phoneNumber:'',   
//first_name,last_name,gender,born,country_id,bank_account,tax_county,tax_percent,address,zipcode,city,phone,description
   saveDetails = async()=>{
     var response = await SaveProfile.personalInfo(this.state.firstName,this.state.lastName,this.state.sex,this.state.dateOfBirth,this.state.country,'kjdkjd','dhfkefj','wjdqwi',this.state.address,this.state.zipcode,this.state.city,this.state.phoneNumber,'efhwefhw')
     console.log(response);
   }

  render() {

    return (
        <ScrollView contentContainerStyle = {styles.container}>
         
          <InputField label='First Name'
                      errorMessage = 'Mandatory field'
                      placeholder = 'Enter first Name'
                      onChangeText = {(text)=>{this.setState({firstName:text})
                                               console.log(this.state.firstName)}
                                     }
                                     
          />

          <InputField label='Last Name'
                      errorMessage = 'Mandatory field'
                      placeholder = 'Enter last Name'
                      onChangeText = {(text)=>{this.setState({lastName:text})
                                               console.log(this.state.lastName)}
                                     }
                                     
          />
          <View style = {{flexDirection:'row',width:'100%',alignItems:'center',paddingTop:16}}>
            <FormLabel labelStyle = {styles.labelStyle}>Sex</FormLabel>
            <Picker   selectedValue={this.state.sex}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                      <Picker.Item label="Male" value="M" />
                      <Picker.Item label="Female" value="F" />
            </Picker>

            <FormLabel labelStyle = {styles.labelStyle}>DOB</FormLabel>
            <TouchableOpacity onPress={()=>this.showDatePicker()}style={{marginRight:16,width:'45%'}}>
              <FormInput onChangeText = {(text)=>{this.setState({dateOfBirth:text})}}
                                 editable={false}
                                 placeholder = 'dd-mm-yyyy'
                                 placeholderTextColor = 'grey'
                                 containerStyle = {{backgroundColor:'#ffffff'}}
                                 value = {this.state.dateOfBirth}
                                 />
            </TouchableOpacity>                   

          </View>

          <InputField label='Address'
                      errorMessage = 'Mandatory field'
                      placeholder = 'Enter Address'
                      onChangeText = {(text)=>{this.setState({address:text})
                                               console.log(this.state.address)}
                                     }
                                     
          />

          <InputField label='Zip Code'
                      errorMessage = 'Mandatory field'
                      placeholder = 'Enter Address'
                      onChangeText = {(text)=>{this.setState({zipcode:text})
                                               console.log(this.state.zipcode)}
                                     }
                                     
          />

          <InputField label='Email'
                      errorMessage = 'Mandatory field'
                      placeholder = 'Enter Address'
                      onChangeText = {(text)=>{this.setState({email:text})
                                               console.log(this.state.email)}
                                     }
                                     
          />

          <InputField label='Phone Number'
                      errorMessage = 'Mandatory field'
                      placeholder = 'Enter Address'
                      onChangeText = {(text)=>{this.setState({phoneNumber:text})
                                               console.log(this.state.phoneNumber)}
                                     }
                                     
          />

          <InputField label='City/Region'
                      errorMessage = 'Mandatory field'
                      placeholder = 'Enter Name'
                      onChangeText = {(text)=>{this.setState({city:text})
                                               console.log(this.state.city)}
                                     }
                                     
          />

          <FormLabel labelStyle = {styles.labelStyle}>Countries</FormLabel>

          <TouchableOpacity onPress={()=>this.setState({visible:true})}
                            style={{marginRight:16,width:'45%'}}>
              <FormInput 
                                 editable={false}
                                 placeholder = 'Country'
                                 placeholderTextColor = 'grey'
                                 containerStyle = {{backgroundColor:'#ffffff'}}
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


           
          <Button rounded
                  raised
                  large
                  
                  containerViewStyle={styles.buttonContainer}
                  title = 'Submit'
                  buttonStyle={[styles.button,{backgroundColor: "#265b91"}]}
                  textStyle = {{color:'white',
                                fontSize:25}}
                  onPress = {()=>this.saveDetails()}              
          />                 

        </ScrollView>)
  }
}

// <InputField label='Country'
//                       errorMessage = 'Mandatory field'
//                       placeholder = 'Enter Name'
//                       onChangeText = {(text)=>{this.setState({country:text})
//                                                console.log(this.state.country)}
//                                      }
                                     
//           />

const styles= StyleSheet.create({
  container: {
    padding:16,
    backgroundColor: '#D4cdb1',
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
			}
});
//             <TouchableOpacity style = {{height:30,width:'25%',backgroundColor:'red'}}
//                               onPress = {()=>this.showDatePicker()}/>