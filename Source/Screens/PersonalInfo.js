import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  DatePickerAndroid,
  ScrollView,
  Text,
  AsyncStorage
} from 'react-native';

import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';
import PhoneInput from 'react-native-phone-input'
import SaveProfile from '../Controller/SaveProfile';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { Icon } from 'react-native-elements';
import ProfileImagePicker from '../Components/ProfileImagePicker';
import CountryPicker from 'react-native-phone-input/lib/countryPicker';

export default class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      sex: 'M',
      dateOfBirth: '',
      address: '',
      zipcode: '',
      city: '',
      email: '',
      phoneNumber: '',
      countries: [],
      visible: false,
      emailError: '',
      textError: '',
      firstnameError: '',
      lastnameError: '',
      emailError: '',
      gender: ['Male', 'Female'],
      checked: 0
    }
  }

  componentDidMount() {
    this.loadCountryDetails();
  }

  validate = (text) => {
    var validate = true;
    const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.firstName == '') {
      this.setState({ firstnameError: 'Please enter first name' })
      validate = false;
    }
    if (this.state.lastName == '') {
      this.setState({ lastnameError: 'Please enter last name' })
      validate = false;
    }
    // if (this.state.email == '') {
    //   this.setState({ emailError: 'Please enter an email' })
    //   validate = false;
    // }
    // text = this.state.email
    // if (mailReg.test(text) === true) {
    //   this.setState({ emailError: 'Enter a valid email' });
    //   validate = false;
    // }
    return validate;
  }

  _renderTextInput = (label, onChangeText, errorMessage, secureTextEntry) => {
    //console.log(label,errorMessage);
    return (<View>
      <FormLabel labelStyle={styles.labelStyle}>{label}</FormLabel>
      <FormInput onChangeText={(text) => { onChangeText(text) }}
        placeholder={label}
        secureTextEntry={secureTextEntry}
        placeholderTextColor='grey'
        containerStyle={styles.textInputStyle} />
      <FormValidationMessage>{errorMessage}</FormValidationMessage>
    </View>
    )
  }

  _renderAddressInput = (label, onChangeText, errorMessage, secureTextEntry) => {
    //console.log(label,errorMessage);
    return (<View>
      <FormLabel labelStyle={styles.labelStyle}>{label}</FormLabel>
      <FormInput onChangeText={(text) => { onChangeText(text) }}
        placeholder={label}
        secureTextEntry={secureTextEntry}
        placeholderTextColor='grey'
        multiline={true}
        numberOfLines={4}
        containerStyle={styles.addressInputStyle}
      />
      <FormValidationMessage>{errorMessage}</FormValidationMessage>
    </View>
    )
  }

  loadCountryDetails = async () => {
    var countriesResponse = await AsyncStorage.getItem('Countries');
    countriesResponse.forEach(element => {
        console.log("element[0].title")      
        console.log(element[0].title)      
    });
    console.log("countriesResponse::::");
    console.log(countriesResponse);
    }

  onSelect = () => {
    alert("pressed...")
  }
  showDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        var date = year + '-' + (month + 1) + '-' + day;
        this.setState({ dateOfBirth: date })
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  saveDetails = async () => {
    var response = await SaveProfile.personalInfo(this.state.firstName, this.state.lastName, this.state.sex, this.state.dateOfBirth, this.state.country, 'kjdkjd', 'dhfkefj', 'wjdqwi', this.state.address, this.state.zipcode, this.state.city, this.state.phoneNumber, 'efhwefhw')
    console.log(response);
    // ========validation is not working properly==========
  }

  genderSelection = () => {
    return (
      this.state.gender.map((data, key) => {
        return (
          <View style={{ width: 100, }}>
            {this.state.checked == key ?
              <TouchableOpacity style={styles.btn}>
                <Icon
                  name='radio-button-checked'
                  type='ionicons'
                />
                <Text style={{ marginTop: 3, }}>{data}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => { this.setState({ checked: key }) }}
                style={styles.btn}>
                <Icon
                  name='radio-button-unchecked'
                  type='ionicons'
                />
                <Text style={{ marginTop: 3 }}>{data}</Text>
              </TouchableOpacity>
            }
          </View>
        )
      }
      ))
  }

  render() {
    return (
      <View Style={styles.container}>
        <Text style={styles.header}>Personal Info</Text>
        <ScrollView >
          <View>
            <ProfileImagePicker />
            {this._renderTextInput('First name',
              (text) => { this.setState({ firstName: text }) },
              this.state.firstnameError, false)}
            {this._renderTextInput('Last Name',
              (text) => { this.setState({ lastName: text }) },
              this.state.lastnameError, false)}
            
            <FormLabel labelStyle={styles.labelStyle}>Email</FormLabel>
            <FormInput onChangeText={(text) => { onChangeText(text) }}
              placeholder="Email"
              placeholderTextColor='grey'
              value={this.props.USER_EMAIL()}
              editable={false}
              containerStyle={styles.textInputStyle} />

            <View>
              < FormLabel labelStyle={styles.labelStyle}>Contact</FormLabel>
              <PhoneInput
                style={styles.phoneInputStyle}
                textStyle={{ color: 'grey' }}
                ref='phone'
                initialCountry="no"/>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <FormLabel labelStyle={styles.genderStyle}>Gender</FormLabel>
              <this.genderSelection />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <FormLabel labelStyle={styles.labelStyle}>DOB</FormLabel>
              <TouchableOpacity onPress={() => this.showDatePicker()} style={{ height: '100%', }}>
                <View style={{ flexDirection: 'row', }}>
                  <FormInput onChangeText={(text) => { this.setState({ dateOfBirth: text }) }}
                    containerStyle={{ marginTop: 14, width: '45%', paddingRight: 8, }}
                    editable={false}
                    placeholder='yyyy-mm-dd'
                    placeholderTextColor='grey'
                    value={this.state.dateOfBirth}
                  />
                  <Icon name="calendar" type="simple-line-icon" color="#4F8EF7" style={{ marginTop: 90, paddingLeft: 10 }} />
                </View>
              </TouchableOpacity>
            </View>
            {this._renderTextInput('Address line 1',
              (text) => { this.setState({ city: text }) },
              this.state.textError, false)}
            {this._renderTextInput('Address line 2',
              (text) => { this.setState({ city: text }) },
              this.state.textError, false)}
            {this._renderTextInput('City/Region',
              (text) => { this.setState({ city: text }) },
              this.state.textError, false)}
            <FormLabel labelStyle={styles.labelStyle}>Select a Tax Country</FormLabel>
            <TouchableOpacity onPress={() => this.setState({ visible: true })}
              style={{
                width: '95%', borderBottomColor: '#265b91',
                borderBottomWidth: 2,
                padding: 0,
                marginLeft: 10
              }}>
              <FormInput
                editable={false}
                placeholder='Tax Country'
                placeholderTextColor='grey'
                borderBottomColor='blue'
              // containerStyle = {{backgroundColor:'transparent', borderColor: 'blue'}}
              />
            </TouchableOpacity>
            <ModalFilterPicker
              visible={this.state.visible}
              onSelect={(picked) => {
                console.log(picked);
                var selectedValue = this.state.countries[--picked];
                this.setState({ country: selectedValue });
                console.log(this.state.country);
                console.log(this.state.country);
              }}
              onCancel={() => this.setState({ visible: false })}
              options={this.state.countries}
              selectedOption='0'
            />
            {this._renderTextInput('Zip Code',
              (text) => { this.setState({ zipcode: text }) },
              this.state.textError, false)}
          </View>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ alignSelf: 'flex-end', bottom: 0, zIndex: 1000, left: '135%', right: 10, marginTop: 30, marginBottom: 110 }}>
              <TouchableOpacity
                onPress={() => {
                  if (this.validate()) {
                    this.saveDetails();
                    this.props.onNextPressed();
                  }
                }}>
                <Icon
                  reverse
                  name='arrow-right'
                  type='material-community'
                  color='#ff7f2a'
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 25,
    margin: 10,
  },
  logo: {
    height: '40%',
    width: '40%',
  },
  button: {
    height: 60,
    borderRadius: 30,
    marginBottom: 50
  },
  buttonContainer: {
    backgroundColor: "transparent",
    marginTop: 20,
    width: '90%',
    marginBottom: 15,
  },
  signIn: {
    color: '#265b91',
    fontSize: 20,
    textDecorationLine: 'underline'
  },
  genderStyle: {
    color: '#265b91',
    fontSize: 18,
    marginTop: 14,
    marginBottom: 0,
    marginLeft: 18,
    marginRight: 14,
    flexDirection: 'column'
  },
  picker: {
    width: '25%',
    height: '50%',
    marginTop: 15,
    backgroundColor: 'transparent',
  },
  pickerItem: {
    padding: 10,
    marginTop: 2,
    backgroundColor: '#ddd',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5
  },
  countryTextInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  itemTextStyle: {
    color: '#222'
  },
  labelStyle: {
    margin: 0,
    padding: 0,
    color: '#265b91',
    fontSize: 18
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
  phoneInputStyle: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#265b91',
    color: 'grey'
  },
  btn: {
    flexDirection: 'row',
    marginRight: 4,
    marginTop: 14,
  }
});