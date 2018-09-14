import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import EmailController from '../Controller/EmailController';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname:'',
      email: '',
      password: '',
      repeatPassword: '',
      showRepeatPassword: true,
      textError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      userType: ['Staff', 'Client'],
      userRole: 'staff'
    }
  }


  componentDidMount() {
  }

  login = async () => {
    var { navigation } = this.props;
    var signUp = navigation.getParam('signUp', false);
    var loginType = navigation.getParam('signUpType', 'NO-ID');
    var response;
    if (signUp) {
      response = await EmailController.UserRegistration(this.state.email, this.state.password, this.state.userRole, this.state.firstname, this.state.lastname);
      emailErrorVar = response.errors.email;

      // this.validate();
      if(emailErrorVar != ''){
        this.setState({
            emailError: emailErrorVar
          })
      }
      // this.validate();
      console.log(response.errors.email);
    } else {
      response = await EmailController.UserLogin(this.state.email, this.state.password);
      console.log(response);
      if (response.StatusCode != 200) {
        navigate('Profile'); // it should go on another stack
      } else {
        console.log(response)
        alert("Wrong usermail or password!")
      }
    }

  }

  validate = (text) => {
    var validate = true;
    const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailReg.test(text) === true) {
      this.setState({ emailError: 'Enter a valid email' });
      validate = false;
    }
    if (this.state.firstname == '' || this.state.lastname == '') {
      this.setState({ textError: 'Mandatory Field' });
      validate = false
    }
    if (this.state.email == '') {
      this.setState({ emailError: 'Mandatory Field' });
      validate = false;
    }
    if (this.state.password == '') {
      this.setState({ passwordError: 'cannot have an empty password' });
      validate = false
    }
    if (this.state.repeatPassword != this.state.password) {
      this.setState({ confirmPasswordError: 'Password does not match' });
      validate = false
    }
    // if (this.state.repeatPassword == this.state.password) {
    //   this.setState({ confirmPasswordError: '' });
    //   validate = false
    // }
    return validate
  }

  _renderConfirmPassword = (label, onChangeText, errorMessage, secureTextEntry) => {
    //console.log(errorMessage);
    const { navigation } = this.props;
    const signUp = navigation.getParam('signUp', false);
    // const logIn = navigation.getParam('logIn', 'NO_ID');
    if (signUp) {
      console.log(signUp);
      return (<View>
        < FormLabel labelStyle={styles.labelStyle}>{label}</FormLabel>
        <FormInput onChangeText={(text) => { onChangeText(text) }}
          secureTextEntry={secureTextEntry}
          placeholder={label}
          placeholderTextColor='grey'
          containerStyle={styles.textInputStyle} />
        <FormValidationMessage>{errorMessage}</FormValidationMessage>

      </View>
      )
    } else {
      return <View />
    }
  }

  _renderTextInput = (label, onChangeText, errorMessage, secureTextEntry) => {
    //console.log(label,errorMessage);
    return (<View>
      <FormLabel labelStyle={styles.labelStyle}>{label}</FormLabel>
      <FormInput onChangeText={(text) => { onChangeText(text) }}
        secureTextEntry={secureTextEntry}
        placeholder={label}
        placeholderTextColor='grey'
        //  inputStyle = {{color: 'white', fontFamily: ''}}
        //  placeholderTextColor = 'white'
        containerStyle={styles.textInputStyle} />
      <FormValidationMessage>{errorMessage}</FormValidationMessage>
    </View>
    )
  }

  userTypeSelection = () => {
    return (
      this.state.userType.map((data, key) => {
        return (
          <View style={{ width: 100, }}>
            {this.state.checked == key ?
              <TouchableOpacity style={styles.btn}
                onPress = {() => {console.log(this.state.userRole)}}>
                <Icon
                  name='radio-button-checked'
                  type='ionicons'
                />
                <Text style={{ marginTop: 3}}>{data}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => { this.setState({ checked: key, userRole: "client" }), console.log(this.state.userRole)}}
                style={styles.btn}>
                <Icon
                  name='radio-button-unchecked'
                  type='ionicons'
                />
                <Text style={{marginTop: 3}}>{data}</Text>
              </TouchableOpacity>
            }
          </View>
        )
      }
      ))
  }

  render() {
    const { navigation } = this.props;
    const signUp = navigation.getParam('signUp', false);
    if (signUp) {
      return (
        <View style={{ backgroundColor: '#ffffff', height: '100%' }}>
          <Text style={styles.header}>Create Account</Text>
          <ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <FormLabel labelStyle={styles.userTypeStyle}>User type</FormLabel>
          <this.userTypeSelection/>
        </View>
          {this._renderTextInput('First name',
              (text) => {
                this.setState({ firstname: text })
              },
              this.state.textError,
              false)}
            {this._renderTextInput('Last name',
              (text) => {
                this.setState({ lastname: text })
              },
              this.state.textError,
              false)}
              {this._renderTextInput('Email',
                (text) => {
                  this.setState({ email: text })
                },
                this.state.emailError,
                false)}
            {this._renderTextInput('Password',
              (text) => {
                if (!signUp) {
                  this.setState({
                    repeatPassword: text,
                    password: text
                  });
                } else {
                  this.setState({ password: text })
                }
              },
              this.state.passwordError,
              true)}
            {this._renderConfirmPassword('Repeat Password',
              (text) => { this.setState({ repeatPassword: text }) },
              this.state.confirmPasswordError,
              false)}
              
            <View style={{ alignSelf: 'center',  marginTop: 30, marginBottom: 50}}>
              <TouchableOpacity
                onPress={() => {
                  if (this.validate())
                    this.login()
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
          </ScrollView>
        </View>
      )
    } else {
      return (
        <View style={{ backgroundColor: '#ffffff' }}>
          <Text style={styles.header}>Sign in</Text>
          <View style={styles.container}>
            {this._renderTextInput('Email',
              (text) => {
                this.setState({ email: text })
              },
              this.state.emailError,
              false)}
            {this._renderTextInput('Password',
              (text) => {
                if (!signUp) {
                  this.setState({
                    repeatPassword: text,
                    password: text
                  });
                } else {
                  this.setState({ password: text })
                }
              },
              this.state.passwordError,
              true)}
            <Button
              onPress={() => this.props.navigation.navigate('App')}
              buttonStyle={{ backgroundColor: "transparent", marginTop: 20 }}
              title='Forgot password?'
              textStyle={{ textAlign: 'right' }} />
            <View style={{ alignSelf: 'center', marginTop: 40 }}>
              <TouchableOpacity
                onPress={() => {
                  if (this.validate())
                    this.login()
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
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#ffffff',
    //justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    fontSize: 40,
    margin: 10,
  },
  userTypeStyle: {
    color: '#265b91',
    fontSize: 18,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15
    
  },
  btn: {
    flexDirection: 'row',
    marginRight: 10
    
  },
  button: {
    height: 60,
    borderRadius: 30
  },
  buttonContainer: {
    backgroundColor: "transparent",
    marginTop: 40,
    width: '90%'
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

  }
});