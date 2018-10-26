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
      firstName: '',
      lastName: '',
      bussinessName: '',
      email: '',
      phoneNumber: '',
      altPhoneNumber: '',
      selectedGender: 'Male',
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
      firstNameError: '',
      lastnameError: '',
      dateOfBirthError: '',
      bussinessNameError: '',
      businessTypeError: '',
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
      showComponent: false,
      about: '',
      aboutError: ''
    }
  }

  componentDidMount() {
    this.loadDefaultDetails();
    this.getUserDetails();

  }

  resetStateVar = () => {
    this.setState({
      firstNameError: '',
      lastnameError: '',
      dateOfBirthError: '',
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
    if (this.state.showComponent) {
      if (this.state.firstName == '') {
        this.setState({ firstNameError: 'Please enter first name' });
        validate = false
      }
      if (this.state.lastName == '') {
        this.setState({ lastnameError: 'Please enter last name' });
        validate = false
      }
      if (this.state.dateOfBirth == '') {
        this.setState({ dateOfBirthError: 'Please enter date of birth' })
      }
    }
    else {
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
    }
    return validate;
  }

  _renderTextInput = (label, value, onChangeText, errorMessage, secureTextEntry) => {
    //console.log(label,errorMessage);
    return (<View>
      <FormLabel labelStyle={styles.labelStyle}>{label}</FormLabel>
      <FormInput onChangeText={(text) => { onChangeText(text) }}
        placeholder={label}
        secureTextEntry={secureTextEntry}
        placeholderTextColor='grey'
        value={value}
        containerStyle={styles.textInputStyle} />
      <FormValidationMessage>{errorMessage}</FormValidationMessage>
    </View>
    )
  }

  loadDefaultDetails = async () => {
    var countriesResponse = await AsyncStorage.getItem('Countries');
    var timezonesResponse = await AsyncStorage.getItem('TimeZones');
    var bussinessCatagoryResponse = await AsyncStorage.getItem('BusinessCategories')
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

  getUserDetails = async () => {
    var result = JSON.parse(await AsyncStorage.getItem('User_Data'))
    var user_role = result.roles[0].title
    this.setState({
      user_role: user_role
    })
    this.setState({
      phoneNumber: result.contact1,
      altPhoneNumber: result.contact2,
      address1: result.address1,
      address2: result.address2,
      city: result.city,
      state: result.state,
      zipcode: result.zipcode,

    })
    if (this.state.user_role == "Staff") {
      this.setState({
        showComponent: true,
        firstName: result.firstname,
        lastName: result.lastname,
        dateOfBirth: result.details.dob,
      })
    } else {
      this.setState({
        bussinessName: result.name
      })
    }
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
            {/* {console.log("init gender is " + this.state.selectedGender)} */}
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
                onPress={() => {
                  this.setState({
                    checked: key,
                    selectedGender: this.state.gender[key]
                  })
                }}
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

  saveClientDetails = async () => {
    const user_id = this.props.USER_ID();
    response = await SaveProfile.clientPersonalInfo(user_id, this.state.bussinessName, this.state.business_id, this.state.phoneNumber, this.state.altPhoneNumber, this.state.address1, this.state.address2, this.state.city, this.state.zipcode, this.state.state, this.state.country_id, this.state.timezone_id, this.state.about)
    console.log(response.status)
    this.setState({ isLoading: false });
    if (response.status == 200) {
      this.props.onNextPressed();
    }
  }

  saveStaffDetails = async () => {
    const user_id = this.props.USER_ID();
    response = await SaveProfile.staffPersonalInfo(user_id, this.state.firstName, this.state.lastName, this.state.dateOfBirth, this.state.selectedGender, this.state.phoneNumber, this.state.altPhoneNumber, this.state.address1, this.state.address2, this.state.city, this.state.zipcode, this.state.state, this.state.country_id, this.state.timezone_id, this.state.about)
    console.log(response.status)
    this.setState({ isLoading: false });
    if (response.status == 200) {
      this.props.onNextPressed();
    }
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

            {this.state.showComponent ?
              this._renderTextInput('First Name', this.state.firstName,
                (text) => { this.setState({ firstName: text }) },
                this.state.firstNameError, false) : null}

            {this.state.showComponent ?
              this._renderTextInput('Last Name', this.state.lastName,
                (text) => { this.setState({ lastName: text }) },
                this.state.lastnameError, false) : null}

            {this.state.showComponent ? null :
              this._renderTextInput('Business Name', this.state.bussinessName,
                (text) => { this.setState({ bussinessName: text }) },
                this.state.bussinessNameError, false)}

            {this.state.showComponent ? null :
              <View>
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
              </View>}

            {this.state.showComponent ?
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FormLabel labelStyle={styles.genderStyle}>Gender</FormLabel>
                <this.genderSelection />
              </View> : null}

            {this.state.showComponent ?
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FormLabel labelStyle={styles.labelStyle}>DOB</FormLabel>
                <TouchableOpacity onPress={() => this.showDatePicker()} style={{ height: '100%', }}>
                  <View style={{ flexDirection: 'row' }}>
                    <FormInput onChangeText={(text) => { this.setState({ dateOfBirth: text }) }}
                      containerStyle={{ marginTop: 14, width: '45%', paddingRight: 8 }}
                      editable={false}
                      placeholder='yyyy-mm-dd'
                      placeholderTextColor='grey'
                      value={this.state.dateOfBirth}
                    />
                    <Icon name="calendar" type="simple-line-icon" color="#4F8EF7" containerStyle={{ marginTop: 14 }} />
                  </View>
                  <FormValidationMessage>{this.state.dateOfBirthError}</FormValidationMessage>
                </TouchableOpacity>
              </View> : null}

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
                initialCountry="no"
                value={this.state.altPhoneNumber}
                onChangePhoneNumber={(text) => {
                  this.setState({ altPhoneNumber: text })
                }} />
              {/* <FormValidationMessage>{this.state.phoneNumberError}</FormValidationMessage> */}
            </View>
            {this._renderTextInput('Address line 1', this.state.address1,
              (text) => { this.setState({ address1: text }) },
              this.state.address1Error, false)}
            {this._renderTextInput('Address line 2', this.state.address2,
              (text) => { this.setState({ address2: text }) },
              this.state.address2Error, false)}
            {this._renderTextInput('City/Region', this.state.city,
              (text) => { this.setState({ city: text }) },
              this.state.cityError, false)}
            {this._renderTextInput('Zip Code', this.state.zipcode,
              (text) => { this.setState({ zipcode: text }) },
              this.state.zipcodeError, false)}
            {this._renderTextInput('State', this.state.state,
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
            <FormLabel labelStyle={styles.labelStyle}>About</FormLabel>
            <FormInput onChangeText={(text) => { this.setState({ about: text }) }}
              placeholder='About'
              value={this.state.about}
              placeholderTextColor='grey'
              multiline={true}
              numberOfLines={3}
              containerStyle={styles.addressInputStyle}
            />
          </View>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ alignSelf: 'flex-end', bottom: 0, zIndex: 1000, left: '135%', right: 10, marginTop: 30, marginBottom: 110 }}>
              <TouchableOpacity
                onPress={() => {
                  this.resetStateVar();
                  if (this.validate()) {
                    this.setState({ isLoading: true });
                    this.state.showComponent ? this.saveStaffDetails() : this.saveClientDetails();
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
    flex: 1,
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
    borderColor: '#265b91',
    // borderBottomWidth: 2,
    padding: 0,
    margin: 0,
    borderWidth: 1,
    borderRadius: 6
    // backgroundColor: '#fff9c4',
    // backgroundColor: '#666666'
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