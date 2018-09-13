import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  StatusBar
} from 'react-native';
import EmailController from '../Controller/EmailController';
import { FormLabel, FormInput, FormValidationMessage,Button } from 'react-native-elements';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      email:'',
      password:'',
      repeatPassword:'',
      showRepeatPassword: true,
      emailError:'',
      passwordError:'',
    }
  }


  componentDidMount() {
  }

  login = async()=>{
    var { navigation } = this.props;
    var signUp = navigation.getParam('signUp', false);
    var loginType = navigation.getParam('signUpType','NO-ID');
    var response;
    if(signUp){
     response = await EmailController.UserRegistration(this.state.email,this.state.password,loginType);
     console.log(response);
    }else{
     response = await EmailController.UserLogin(this.state.email,this.state.password);
       console.log(response);
       if(response.StatusCode != 200){
         navigate('Profile'); // it should go on another stack
       }else{
         console.log(response)
         alert("Wrong usermail or password!")
       }
    } 

  }

  validate=()=>{
    var validate = true;
    
    if(this.state.email == ''){
      
      this.setState({emailError:'Mandatory Field'});
      validate = false;
    }
    if(this.state.password == ''){
      
      this.setState({passwordError:'cannot have an empty password'});
      validate = false
    }

    return validate
  }

  _renderConfirmPassword = (label,onChangeText,errorMessage,secureTextEntry)=>{
    //console.log(errorMessage);
    const { navigation } = this.props;
    const signUp = navigation.getParam('signUp', false);
    // const logIn = navigation.getParam('logIn', 'NO_ID');
    if(signUp){
      console.log(signUp);
      return(<View>
        < FormLabel labelStyle={styles.labelStyle}>{label}</FormLabel>
        <FormInput onChangeText = {(text)=>{onChangeText(text)}}
                 secureTextEntry = {secureTextEntry}
                 placeholder = {label}
                 placeholderTextColor = 'grey'
                 containerStyle = {styles.textInputStyle}/>
        <FormValidationMessage>{errorMessage}</FormValidationMessage>           

      </View>
      )
    }else{      
      return <View/>
    }
  }

  _renderTextInput=(label,onChangeText,errorMessage,secureTextEntry)=>{
    //console.log(label,errorMessage);
    return(<View>
      <FormLabel labelStyle={styles.labelStyle}>{label}</FormLabel>
      <FormInput onChangeText = {(text)=>{onChangeText(text)}}
                 secureTextEntry = {secureTextEntry}
                 placeholder = {label}
                 placeholderTextColor = 'grey'
                //  inputStyle = {{color: 'white', fontFamily: ''}}
                //  placeholderTextColor = 'white'
                 containerStyle = {styles.textInputStyle} />
      <FormValidationMessage>{errorMessage}</FormValidationMessage>           

      </View>
      )
  }

  render() {
    const { navigation } = this.props;
    const signUp = navigation.getParam('signUp', false);
    
    if(signUp){                        
     return (
	<View>
          <Text style = {{fontSize: 20, fontWeight: '500', padding: 15,  backgroundColor: '#F57F17', textAlign: 'center', color: 'white'}}>Create account</Text>
        <View style={styles.container}>
          {this._renderTextInput('Email',
                                  (text)=>{this.setState({email:text})
                                          },
                                  this.state.emailError,
                                  false)}
          {this._renderTextInput('Password',
                                  (text)=>{ if(!signUp){
                                             this.setState({repeatPassword:text,
                                                            password:text});
                                            }else{
                                              this.setState({password:text})
                                           }},
                                  this.state.passwordError,
                                  true)}
          {this._renderConfirmPassword('Repeat Password',
                                      (text)=>{this.setState({repeatPassword:text})},
                                      '',
                                      false)}
          <Button rounded
                  raised
                  large
                  disabled = {this.state.password == this.state.repeatPassword?false:true}
                  containerViewStyle={styles.buttonContainer}
                  title = 'Submit'
                  buttonStyle={[styles.button,{backgroundColor: "#265b91"}]}
                  textStyle = {{color:'white',
                                fontSize:25}}
                  onPress = {()=>{if(this.validate())
                                    this.login();
                                 }
                            }              
          />
         
        </View>
	</View>
        )}else {
          return (
            <View>
          <Text style = {{fontSize: 20, fontWeight: '500', padding: 15,  backgroundColor: '#F57F17', textAlign: 'center', color: 'white'}}>Sign In</Text>
            <View style={styles.container}>
              {this._renderTextInput('Email',
                                      (text)=>{this.setState({email:text})
                                              },
                                      this.state.emailError,
                                      false)}
              {this._renderTextInput('Password',
                                      (text)=>{ if(!signUp){
                                                 this.setState({repeatPassword:text,
                                                                password:text});
                                                }else{
                                                  this.setState({password:text})
                                               }},
                                      this.state.passwordError,
                                      true)}
              <Button
                 onPress={()=>this.props.navigation.navigate('App')}
                 buttonStyle={{backgroundColor: "transparent", marginTop: 20}}
                 title = 'Forgot password?'
                 textStyle = {{textAlign: 'right'}} />
              <Button rounded
                      raised
                      large
                      disabled = {this.state.password == this.state.repeatPassword?false:true}
                      containerViewStyle={styles.buttonContainer}
                      title = 'Submit'
                      buttonStyle={[styles.button,{backgroundColor: "#265b91"}]}
                      textStyle = {{color:'white',
                                    fontSize:25}}
                      onPress = {()=>{if(this.validate())
                                        this.login();
                                     }
                                }              
              />
             
            </View>
            </View>
            )
        }
}
}



const styles= StyleSheet.create({
  container: {
    height:'100%',
    backgroundColor: '#D4cdb1',
    //justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40
  },
  button:{
      height:60,
      borderRadius:30
  },
  buttonContainer:{
    backgroundColor: "transparent",
    marginTop: 40,
    width:'90%'
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

  }
});