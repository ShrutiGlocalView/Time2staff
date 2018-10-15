import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  DatePickerAndroid,
  ScrollView,
  Text,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';
import PhoneInput from 'react-native-phone-input'
import SaveProfile from '../Controller/SaveProfile';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { Icon } from 'react-native-elements';
import ProfileImagePicker from '../Components/ProfileImagePicker';

export default class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picked: null,
      bussinessName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      sex: 'M',
      dateOfBirth: '',
      address1: '',
      address2: '',
      city: '',
      zipcode: '',
      state: '',
      country: '',
      country_id: '',
      countries: [],
      businessType: '',
      business_id: '',
      businessTypes: [],
      timezone: '',
      timezone_id: '',
      timezones: [],
      visibleCountryModal: false,
      visibleBusinessModal: false,
      visibleTimeZoneModal: false,
      textError: '',
      bussinessNameError: '',
      businessTypeError: '',
      lastnameError: '',
      isValidPhone: true,
      phoneNumberError: '',
      address1Error: '',
      address2Error: '',
      cityError: '',
      zipcodeError: '',
      stateError: '',
      countryError: '',
      timezoneError: '',
      gender: ['Male', 'Female'],
      checked: 0,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.loadDefaultDetails();
  }

  resetStateVar = () => {
    this.setState({
      bussinessNameError: '',
      businessTypeError: '',
      phoneNumberError: '',
      address1Error: '',
      address2Error: '',
      cityError: '',
      stateError: '',
      zipcodeError: '',
      countryError: '',
      timezoneError: ''
    })
  }

  validate = () => {
    var validate = true;
    const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.bussinessName == '') {
      this.setState({ bussinessNameError: 'Please enter bussiness name' })
      validate = false;
    }
    if (this.state.businessType == '') {
      this.setState({ businessTypeError: 'Please select a category' })
      validate = false;
    }
    if (this.state.address1 == '') {
      this.setState({ address1Error: 'Please enter address line 1' })
      validate = false;
    }
    if (this.state.address2 == '') {
      this.setState({ address2Error: 'Please enter address line 2' })
      validate = false;
    }
    if (this.state.city == '') {
      this.setState({ cityError: 'Please enter city or region' })
      validate = false;
    }
    // if (this.state.state == '') {
    //   this.setState({ stateError: 'Please enter state' })
    //   validate = false;
    // }
    if (this.state.zipcode == '') {
      this.setState({ zipcodeError: 'Please enter zipcode' })
      validate = false;
    }
    if (this.state.country == '') {
      this.setState({ countryError: 'Please select a country' })
      validate = false;
    } 
    if (this.state.timezone == '') {
      this.setState({ timezoneError: 'Please select a time zone' })
      validate = false;
    }
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

  loadDefaultDetails = async () => {
    var countriesResponse = await AsyncStorage.getItem('Countries');
    var timezonesResponse = await AsyncStorage.getItem('TimeZones');
    var bussinessCatagoryResponse = await AsyncStorage.getItem('BusinessCategories')
    // console.log("List of Countries are::::::")
    // console.log(countriesResponse)
    // console.log("List of Timezones are::::::")
    // console.log(timezonesResponse)
    // console.log("List of Business categories are::::::")
    // console.log(bussinessCatagoryResponse)
    var resultCountries = JSON.parse(countriesResponse);
    var resultTimezones = JSON.parse(timezonesResponse);
    var resultBusinesses = JSON.parse(bussinessCatagoryResponse);
    var a = [], b = [], c = [];
    for (var i = 0; i < resultCountries.length; i++) {
      a.push({ key: i, label: resultCountries[i].title, country_id: resultCountries[i].id });
    }

    for (var i = 0; i < resultTimezones.length; i++) {
      b.push({ key: i, label: resultTimezones[i].zone + " (" + resultTimezones[i].gmt + ")", timezone_id: resultTimezones[i].id });
    }

    for (var i = 0; i < resultBusinesses.length; i++) {
      c.push({ key: i, label: resultBusinesses[i].title, business_id: resultBusinesses[i].id });
    }
    this.setState({
      countries: a,
      timezones: b,
      businessTypes: c
    });
  }

  onShowCountries = () => {
    this.setState({ visibleCountryModal: true });
  }

  onSelectCountry = (picked) => {
    this.setState({
      picked: picked,
      visibleCountryModal: false,
      country: this.state.countries[picked].label,
    })
    console.log(picked)
    console.log(this.state.countries[picked].label);
    this.setState({
      country_id: this.state.countries[picked].country_id
    })
  }

  onCancelCountries = () => {
    this.setState({
      visibleCountryModal: false
    });
  }

  onShowBusinessTypes = () => {
    this.setState({ visibleBusinessModal: true });
  }

  onSelectBusinessType = (pickedBusiness) => {
    this.setState({
      pickedBusiness: pickedBusiness,
      visibleBusinessModal: false,
      businessType: this.state.businessTypes[pickedBusiness].label
    })
    console.log(pickedBusiness)
    console.log(this.state.businessTypes[pickedBusiness].label);
    this.setState({
      business_id: this.state.businessTypes[pickedBusiness].business_id
    })
  }

  onCancelBusinessTypes = () => {
    this.setState({
      visibleBusinessModal: false
    });
  }

  onShowTimezones = () => {
    this.setState({ visibleTimeZoneModal: true });
  }

  onSelectTimezone = (pickedTimezone) => {
    this.setState({
      pickedTimezone: pickedTimezone,
      visibleTimeZoneModal: false,
      timezone: this.state.timezones[pickedTimezone].label
    })
    console.log(pickedTimezone)
    console.log(this.state.timezones[pickedTimezone].label);
    this.setState({
      timezone_id: this.state.timezones[pickedTimezone].timezone_id
    })
  }

  onCancelTimezones = () => {
    this.setState({
      visibleTimeZoneModal: false
    });
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

  saveDetails = async () => {
    const user_id = this.props.USER_ID();
    response = await SaveProfile.personalInfo(user_id, this.state.bussinessName, this.state.business_id, this.state.phoneNumber, this.state.address1, this.state.city, this.state.zipcode, this.state.state, this.state.country_id, this.state.timezone_id)
    console.log(response.status)
    this.setState({ isLoading: false });
    if (response.status == 200) {
      this.props.onNextPressed();
    }

  }

  render() {
    if (this.state.isLoading) {
      return (
        <View styles={[styles.ActivityIndicatorContainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    return (
      <View Style={styles.container}>
        <Text style={styles.header}>Personal Info</Text>
        <ScrollView>
          <View>
            <ProfileImagePicker />
            {this._renderTextInput('Business Name',
              (text) => { this.setState({ bussinessName: text }) },
              this.state.bussinessNameError, false)}

            <FormLabel labelStyle={styles.labelStyle}>Businesss Category</FormLabel>
            <TouchableOpacity onPress={this.onShowBusinessTypes}
              style={{
                width: '95%', borderBottomColor: '#265b91',
                borderBottomWidth: 2,
                padding: 0,
                marginLeft: 10
              }}>
              <FormInput
                editable={false}
                placeholder='Select Category'
                placeholderTextColor='grey'
                borderBottomColor='blue'
                value={this.state.businessType}
              // containerStyle = {{backgroundColor:'transparent', borderColor: 'blue'}}
              />
            </TouchableOpacity>
            <FormValidationMessage>{this.state.businessTypeError}</FormValidationMessage>
            <ModalFilterPicker
              options={this.state.businessTypes}
              visible={this.state.visibleBusinessModal}
              onSelect={this.onSelectBusinessType}
              onCancel={this.onCancelBusinessTypes}
            />
            <View>
              < FormLabel labelStyle={styles.labelStyle}>Phone</FormLabel>
              <PhoneInput
                style={styles.phoneInputStyle}
                textStyle={{ color: 'grey' }}
                // ref='phone'
                ref={ref => {
                  this.phone = ref;
                }}
                initialCountry="no"
                value={this.state.phoneNumber}
                onChangePhoneNumber={(text) => {
                  this.setState({ phoneNumber: text })
                }} />
              <FormValidationMessage>{this.state.phoneNumberError}</FormValidationMessage>
            </View>
            <View>
              < FormLabel labelStyle={styles.labelStyle}>Alt. Phone</FormLabel>
              <PhoneInput
                style={styles.phoneInputStyle}
                textStyle={{ color: 'grey' }}
                ref='phone'
                initialCountry="no" />
              {/* <FormValidationMessage>{this.state.phoneNumberError}</FormValidationMessage> */}
            </View>
            {this._renderTextInput('Address line 1',
              (text) => { this.setState({ address1: text }) },
              this.state.address1Error, false)}
            {this._renderTextInput('Address line 2',
              (text) => { this.setState({ address2: text }) },
              this.state.address2Error, false)}
            {this._renderTextInput('City/Region',
              (text) => { this.setState({ city: text }) },
              this.state.cityError, false)}
            {this._renderTextInput('Zip Code',
              (text) => { this.setState({ zipcode: text }) },
              this.state.zipcodeError, false)}
            {this._renderTextInput('State',
              (text) => { this.setState({ state: text }) },
              this.state.stateError, false)}
            <FormLabel labelStyle={styles.labelStyle}>Country</FormLabel>
            <TouchableOpacity onPress={this.onShowCountries}
              style={{
                width: '95%', borderBottomColor: '#265b91',
                borderBottomWidth: 2,
                padding: 0,
                marginLeft: 10
              }}>
              <FormInput
                editable={false}
                placeholder='Select a country'
                placeholderTextColor='grey'
                borderBottomColor='blue'
                value={this.state.country}
              // containerStyle = {{backgroundColor:'transparent', borderColor: 'blue'}}
              />
            </TouchableOpacity>
            <FormValidationMessage>{this.state.countryError}</FormValidationMessage>
            <ModalFilterPicker
              options={this.state.countries}
              visible={this.state.visibleCountryModal}
              onSelect={this.onSelectCountry}
              onCancel={this.onCancelCountries}
            />

            <FormLabel labelStyle={styles.labelStyle}>Time Zone</FormLabel>
            <TouchableOpacity onPress={this.onShowTimezones}
              style={{
                width: '95%', borderBottomColor: '#265b91',
                borderBottomWidth: 2,
                padding: 0,
                marginLeft: 10
              }}>
              <FormInput
                editable={false}
                placeholder='Select a time zone'
                placeholderTextColor='grey'
                borderBottomColor='blue'
                value={this.state.timezone}
              // containerStyle = {{backgroundColor:'transparent', borderColor: 'blue'}}
              />
            </TouchableOpacity>
            <FormValidationMessage>{this.state.timezoneError}</FormValidationMessage>
            <ModalFilterPicker
              options={this.state.timezones}
              visible={this.state.visibleTimeZoneModal}
              onSelect={this.onSelectTimezone}
              onCancel={this.onCancelTimezones}
            />

          </View>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ alignSelf: 'flex-end', bottom: 0, zIndex: 1000, left: '135%', right: 10, marginTop: 30, marginBottom: 110 }}>
              <TouchableOpacity
                onPress={() => {
                  this.resetStateVar();
                  if (this.validate()) {
                    this.setState({ isLoading: true });
                    this.saveDetails();
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
  ActivityIndicatorContainer: {
    flex:1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
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