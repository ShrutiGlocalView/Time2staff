import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native';
import { Button, Icon, FormInput, FormValidationMessage, FormLabel } from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {
    LoginButton,
    AccessToken,
} from 'react-native-fbsdk';
import {
    GoogleSignin,
    GoogleSigninButton
} from 'react-native-google-signin';

import EmailController from '../Controller/EmailController';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            repeatPassword: '',
            showRepeatPassword: true,
            textError: '',
            firstnameError:'',
            lastnameError:'',
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
            userType: ['Staff', 'Client'],
            userRole: 'staff',
            selectedButton: 'login',
            loginErrorMessage:'',
            forgotPasswordMessage: '',

        }
    }

    componentDidMount() {
        GoogleSignin.configure({
          scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
          // iosClientId: '<FROM DEVELOPER CONSOLE>', // only for iOS
          webClientId: "966508246263-43vkhmudcmti3jnbv3c41r51pdpok87o.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
          // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
          // hostedDomain: '', // specifies a hosted domain restriction
          // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
          // accountName: '', // [Android] specifies an account name on the device that should be used
        })
    }

    onLoginFinished = (error, result) => {
        if (error) {
          console.log(error.toString());
          alert("login has error: " + result.error);
        } else if (result.isCancelled) {
          alert("login is cancelled.");
        } else {
          console.log(JSON.stringify(result));
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              var accessToken = data.accessToken.toString();
              this.initUser(accessToken);
              console.log('-------------------');
              console.log(accessToken);
            }
          )
        }
      }

      initUser = async (token) => {
        var response = await fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token);
        var responseJson = await response.json();
        var loginResponse = await EmailController.UserLogin(responseJson.email, responseJson.id);
        console.log(loginResponse);
      }

    signup = async () => {
        var response;
        response = await EmailController.UserRegistration(this.state.email, this.state.password, this.state.userRole, this.state.firstname, this.state.lastname);
        emailErrorVar = response.errors.email;
        passwordErrorVar = response.errors.password;
        this.validate();
        if (emailErrorVar != '') {
            this.setState({
                emailError: emailErrorVar
            })
        }
        // this.validate();
        console.log(response.errors.email);
        if (passwordErrorVar != '') {
            this.setState({
                passwordError: passwordErrorVar
            })
        }
        // this.validate();
        console.log(response.errors.password);

    }

    login = async () => {
        response = await EmailController.UserLogin(this.state.email, this.state.password);
        loginErrorMessage = this.setState({
            loginErrorMessage: response.error,
        })
        console.log('---------------------------')
        if(response.hasOwnProperty('status')){
            console.log('status is showed...')
            this.props.navigation.navigate('CompleteProfileNavigator')
        }else{
            console.log('status is not showed...')}
        console.log(response.error);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    forgotPasssword = async () =>{
        response = await EmailController.ForgotPassword(this.state.email);
        forgotPasswordMessage = this.setState({
            forgotPasswordMessage: response.errors.email[1],
        })
        console.log(response.errors.email);
    }

    signIn = async () => {
        var user, token;
        // console.log('hiii');
        user = await GoogleSignin.signIn();
        token = user.accessToken;
        console.log("ACCESS TOKEN HERE: s", token);
        await AsyncStorage.setItem('token_key', user.accessToken);
        const gotToken = await AsyncStorage.getItem('token_key');
        alert("token is:" + " " + gotToken);
        this.setState({ user });
        this.getCountries();

      };

    validate = (text) => {
        var validate = true;
        const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mailReg.test(text) === true) {
            this.setState({ emailError: 'Enter a valid email' });
            validate = false;
        } else{
            this.setState({ emailError: '' });
            validate = true;
        }
        if (this.state.firstname == '') {
            this.setState({ firstnameError: 'Mandatory Field' });
            validate = false
        }else {
            this.setState({ firstnameError: '' });
            validate = true
        }

        if (this.state.lastname == '') {
            this.setState({ lastnameError: 'Mandatory Field' });
            validate = false
        }else {
            this.setState({ lastnameError: '' });
            validate = true
        }

        if (this.state.email == '') {
            this.setState({ emailError: 'Mandatory Field' });
            validate = false;
        }else{
            this.setState({ emailError: '' });
            validate = true;
        }
        if (this.state.password == '') {
            this.setState({ passwordError: 'cannot have an empty password' });
            validate = false
        }else{
            this.setState({ passwordError: '' });
            validate = true
        }
        if (this.state.repeatPassword != this.state.password) {
            this.setState({ confirmPasswordError: 'Password does not match' });
            validate = false
        }else{
            this.setState({ confirmPasswordError: '' });
            validate = true
        }
        return validate;
    }

    userTypeSelection = () => {
        return (
            this.state.userType.map((data, key) => {
                return (
                    <View style={{ width: 100, }}>
                        {this.state.checked == key ?
                            <TouchableOpacity style={styles.btn}
                                onPress={() => { console.log(this.state.userRole) }}>
                                <Icon
                                    name='radio-button-checked'
                                    type='ionicons'
                                />
                                <Text style={{ marginTop: 3 }}>{data}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => { this.setState({ checked: key, userRole: "client" }), console.log(this.state.userRole) }}
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

    _renderTextInput = (label, onChangeText, errorMessage, secureTextEntry) => {
        //console.log(label,errorMessage);
        return (<View>
            <FormInput onChangeText={(text) => { onChangeText(text)
                this.validate();
            }}
                secureTextEntry={secureTextEntry}
                placeholder={label}
                placeholderTextColor='grey'
                containerStyle={styles.textInputStyle} />
            <FormValidationMessage>{errorMessage}</FormValidationMessage>
        </View>
        )
    }

    _renderConfirmPassword = (label, onChangeText, errorMessage, secureTextEntry) => {
        return (<View>
            <FormInput onChangeText={(text) => { onChangeText(text)
                    if (this.state.repeatPassword != this.state.password) {
                        this.setState({ confirmPasswordError: 'Password does not match' });
                    }else{
                        this.setState({ confirmPasswordError: '' });
                    }
               }}
                secureTextEntry={secureTextEntry}
                placeholder={label}
                placeholderTextColor='grey'
                containerStyle={styles.textInputStyle} />
            <FormValidationMessage>{errorMessage}</FormValidationMessage>

        </View>
        )
    }

    renderLoginModule = () => {
        if (this.state.selectedButton == 'login') {
             return (
                <View style={{ width: '100%', margin: 10 }}>
                    <TextInput
                        style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 10 }}
                        onChangeText={(email) => this.setState({ email })
                            }
                        value={this.state.email}
                        placeholder='Username or Email'
                        inlineImageLeft='email'
                        inlineImagePadding={10} />
                    <TextInput
                        style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 10 }}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        placeholder='Password'
                        secureTextEntry={true}
                        inlineImageLeft='lock'
                        inlineImagePadding={10} />
                        <FormValidationMessage>{this.state.loginErrorMessage}</FormValidationMessage>
                        <TouchableOpacity
                    style = {{alignSelf: 'flex-end', margin: 10,}}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                        <Text>Forgot password</Text>
                    </TouchableOpacity>
                    {/* <Text style={{ alignSelf: 'flex-end', margin: 10, }}>Forgot password</Text> */}
                    <Button
                        fontSize={12}
                        title='Login'
                        buttonStyle={{ backgroundColor: 'orange', marginBottom: 20 }}
                        onPress={() => {
                                this.login()
                            }} />
                </View>
            )
        } else {
            return (
                <ScrollView style={{ width: '100%', margin: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <FormLabel labelStyle={styles.userTypeStyle}>User type</FormLabel>
                        <this.userTypeSelection />
                    </View>
                    {this._renderTextInput('First name',
                        (text) => {this.setState({ firstname: text })},
                        this.state.firstnameError, false)}
                    {this._renderTextInput('Last name',
                        (text) => {this.setState({ lastname: text })},
                        this.state.lastnameError, false)}
                    {this._renderTextInput('Email',
                        (text) => {this.setState({ email: text })},
                        this.state.emailError, false)}
                    {this._renderTextInput('Password',
                        (text) => {this.setState({ password: text })},
                        this.state.passwordError, false)}
                    {this._renderConfirmPassword('Repeat Password',
                        (text) => { this.setState({ repeatPassword: text })},
                        this.state.confirmPasswordError, false)}
                    <Button
                        fontSize={12}
                        title='Sign up'
                        buttonStyle={{ backgroundColor: 'orange' }}
                        onPress={() => {
                            if (this.validate())
                                this.signup()
                        }} />
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={{ width: '100%', height: '100%', alignItems: 'center' }}>
                <Image
                    style={styles.logo}
                    source={require('../../Assets/logo_round.png')}
                    resizeMode='contain' />
                <LoginButton
                    style={{ width: '90%', height: 40, marginTop: 0 }}
                    onLoginFinished={(error, result) => this.onLoginFinished(error, result)}
                    onLogoutFinished={() => alert("logout.")}
                    readPermissions={['public_profile']} />

                <GoogleSigninButton
                    style={{ width: '90%', height: 40, marginTop: 10 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => { this.signIn() }} />

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '40%', height: 1, borderWidth: 1, borderColor: '#000000', marginTop: 10, marginRight: 5, }}></View>
                    <Text>or</Text>
                    <View style={{ width: '40%', height: 1, borderWidth: 1, borderColor: '#000000', marginTop: 10, marginLeft: 5 }}></View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 40, alignSelf: 'flex-start' }}>
                    <Button
                        fontSize={12}
                        title='Login'
                        onPress={() => {
                            this.setState({ selectedButton: 'login' });
                            //this.loginPressed()
                        }}
                        buttonStyle={{ backgroundColor: this.state.selectedButton == 'login' ? 'orange' : 'grey' }} />

                    <Button
                        fontSize={12}
                        title='Register'
                        onPress={() => {
                            this.setState({ selectedButton: 'reg' });
                        }}
                        buttonStyle={{ backgroundColor: this.state.selectedButton == 'login' ? 'grey' : 'orange' }} />
                </View>
                <View style={{ width: '92%', height: 1, borderWidth: 1, borderColor: '#f1f1f1' }}></View>
                {this.renderLoginModule()}
                <Modal

                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                        this.setState({forgotPasswordMessage: ''})
                    }}>
                    <View style={{margin: 22}}>

                            <View style={{ width: '100%', margin: 10 }}>
                                <Text style={{fontSize: 20}}>Forgot Password</Text>
                                <Text style={{marginTop: 10}}>Please enter your email address. You will receive a link to create a new password via email.</Text>
                                <TextInput
                                    style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 10 }}
                                    onChangeText={(email) => this.setState({ email })}
                                    value={this.state.email}
                                    placeholder='Email address'
                                    inlineImageLeft='email'
                                    inlineImagePadding={10} />
                                <FormValidationMessage>{this.state.forgotPasswordMessage}</FormValidationMessage>
                                <Button
                                    fontSize={12}
                                    title='Send now'
                                    onPress={() => {
                                        this.forgotPasssword();
                                    }}
                                    buttonStyle={{ backgroundColor: 'orange',  marginTop: 20 }} />
                                <Button
                                    fontSize={12}
                                    title='Go back'
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        this.setState({forgotPasswordMessage: ''})
                                    }}
                                    buttonStyle={{ backgroundColor: 'orange',  marginTop: 10 }} />

                            </View>
                        </View>
                </Modal>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        height: '30%',
        width: '30%',
        marginTop: 5,
        marginBottom: 2,
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
    textInputStyle: {
        borderBottomColor: '#265b91',
        borderBottomWidth: 1,
        padding: 0,
        margin: 0

    }
})


{/* <TextInput
                        style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 10 }}
                        onChangeText={(firstname) => this.setState({ firstname })}
                        value={this.state.firstname}
                        placeholder='First name'
                        inlineImageLeft='email'
                        inlineImagePadding={10} /> */}
{/* <TextInput
                        style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 10 }}
                        onChangeText={(lastname) => this.setState({ lastname })}
                        value={this.state.lastname}
                        placeholder='Last name'
                        secureTextEntry={true}
                        inlineImageLeft='lock'
                        inlineImagePadding={10} />
                    <TextInput
                        style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 10 }}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        placeholder='Email address'
                        inlineImageLeft='email'
                        inlineImagePadding={10} />
                    <TextInput
                        style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 10 }}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        placeholder='Password'
                        inlineImageLeft='email'
                        inlineImagePadding={10} /><TextInput
                        style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 10 }}
                        onChangeText={(repeatPassword) => this.setState({ repeatPassword })}
                        value={this.state.repeatPassword}
                        placeholder='Confirm password'
                        inlineImageLeft='email'
                        inlineImagePadding={10} /> */}