import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    ScrollView,
} from 'react-native';
import {
    Button,
    Icon,
    FormInput,
    FormValidationMessage,
    FormLabel,
    SocialIcon
} from 'react-native-elements';
import {
    LoginButton,
    AccessToken,
} from 'react-native-fbsdk';
import {
    GoogleSignin,
    GoogleSigninButton
} from 'react-native-google-signin';
import Snackbar from 'react-native-snackbar';
import VerifyEmail from '../Components/VerifyEmail'
import EmailController from '../Controller/EmailController';
import ForgotPasswordDialog from '../Components/ForgotPasswordDialog';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginButtonPressed: false,
            signupButtonPressed: false,
            forgotPasswordButtonPressed: false,
            isLoading: false,
            modalVisible: false,
            registerModalVisible: false,
            firstname: '',
            lastname: '',
            email: '',
            registerEmail: '',
            registerPassword: '',
            password: '',
            repeatPassword: '',
            showRepeatPassword: true,
            textError: '',
            firstnameError: '',
            lastnameError: '',
            emailError: '',
            registerEmailError: '',
            passwordError: '',
            registerPasswordError: '',
            confirmPasswordError: '',
            userType: ['Staff', 'Client'],
            userRole: 'staff',
            selectedButton: 'login',
            loginErrorMessage: '',
            forgotPasswordMessage: '',
            verifyEmailVisibility: false,
            hidePasswordLogin: true,
            hidePasswordSignup: true,
        }
    }

    componentDidMount() {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: "966508246263-43vkhmudcmti3jnbv3c41r51pdpok87o.apps.googleusercontent.com",
        })
    }

    resetStateVar = () => {
        this.setState({
            emailError: '',
            passwordError: '',
            loginErrorMessage: '',
            registerEmailError: '',
            firstnameError: '',
            lastnameError: '',
            registerPasswordError: '',
            confirmPasswordError: '',
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center', height: '100%', width: '100%', padding: 16, }}>
                    <Image
                        style={styles.logo}
                        source={require('../../Assets/logo_round.png')}
                        resizeMode='contain' />
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={styles.line}></View>
                        <Text style={{ color: 'grey', fontSize: 15 }}>Log in with</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <SocialIcon type='facebook'>
                            <LoginButton
                                style={styles.facebookBtn}
                                onLoginFinished={(error, result) => this.onLoginFinished(error, result)}
                                onLogoutFinished={() => alert("logout.")}
                                readPermissions={['public_profile']} />
                        </SocialIcon>

                        <GoogleSigninButton
                            style={{ width: 60, height: 60, borderRadius: 10 }}
                            size={GoogleSigninButton.Size.Icon}
                            color={GoogleSigninButton.Color.Light}
                            onPress={() => { this.signIn() }} />
                    </View>
                    <Text style={{ alignSelf: 'center', color: 'grey', fontSize: 18 }}>or</Text>
                    {this.renderLoginModule()}
                    {this.renderForgotPassword()}
                    {this.renderRegisterModule()}
                    <ForgotPasswordDialog email={this.state.email}
                        setModalVisible={this.setModalVisible}
                        modalVisible={false} />
                    <VerifyEmail modalVisible={this.state.verifyEmailVisibility}
                        setModalVisible={this.toggleVerifyEmailModal}
                        onContinuePress={this.verifyEmailContinue} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                    alignItems: 'center',
                    position: 'absolute',
                    height: '5%',
                    width: '90%',
                    // backgroundColor: 'rgba(0,0,0,0.5)',
                    bottom: 10
                }}>
                    <TouchableOpacity onPress={() => { this.setRegisterModalVisible(true); }}>
                        <Text style={{ color: 'black', fontSize: 15 }}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.setModalVisible(true); }}>
                        <Text style={{ color: 'black', fontSize: 15 }}>Forgot password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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

    verifyEmailContinue = () => {
        this.setRegisterModalVisible(false);
        this.toggleVerifyEmailModal(false);
    }

    toggleVerifyEmailModal = (visibility) => {
        this.setState({ verifyEmailVisibility: visibility })
    }

    initUser = async (token) => {
        var response = await fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token);
        var responseJson = await response.json();
        var loginResponse = await EmailController.UserLogin(responseJson.email, responseJson.id);
        console.log(loginResponse);
    }

    signup = async () => {
        var response;
        response = await EmailController.UserRegistration(this.state.registerEmail, this.state.registerPassword, this.state.userRole, this.state.firstname, this.state.lastname);
        this.setState({
            signupButtonPressed: false
        })
        if (response.hasOwnProperty('status')) {
            console.log('status is showed...')
            this.setRegisterModalVisible(!this.state.registerModalVisible);
            this.setState({
                verifyEmailVisibility: true
            });
        }
        emailErrorVar = response.errors.email;
        passwordErrorVar = response.errors.password;
        this.validate();
        if (emailErrorVar != '') {
            this.setState({
                registerEmailError: emailErrorVar
            })
        }
        // this.validate();
        console.log(response.errors.email);
        if (passwordErrorVar != '') {
            this.setState({
                registerPasswordError: passwordErrorVar
            })
        }
        // this.validate();
        console.log(response.errors.password);

    }

    login = async () => {
        response = await EmailController.UserLogin(this.state.email, this.state.password);
        if (response.hasOwnProperty('errors')) {
            loginErrorMessage = this.setState({
                loginErrorMessage: response.errors.username[0],
                loginButtonPressed: false
            })
        } else if (response.hasOwnProperty('error')) {
            loginErrorMessage = this.setState({
                loginErrorMessage: response.message,
                loginButtonPressed: false
            })
        }

        if (response.status == 'pending') {
            Snackbar.show({
                title: 'Account is not verified.\nResend varification email?',
                duration: Snackbar.LENGTH_INDEFINITE,
                action: ({
                    title: 'Resend',
                    color: 'orange',
                    onPress: () => {
                        response = EmailController.ResendEmail(this.state.email);
                    }
                })
            });
        } else if (response.status == 'success') {
            this.setState({
                loginButtonPressed: false
            })
            USER_EMAIL = response.user_data.email;
            USER_ID = response.user_data.id;
            this.props.navigation.navigate('CompleteProfileNavigator',
                { USER_EMAIL: response.user_data.email, USER_ID: USER_ID })
            // console.log(USER_EMAIL);
            // console.log(USER_ID);

        } else {
            console.log(response.error);
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setRegisterModalVisible(visible) {
        this.setState({ registerModalVisible: visible });
    }

    forgotPasssword = async () => {
        response = await EmailController.ForgotPassword(this.state.email);
        this.setState({
            forgotPasswordButtonPressed: false
        })
        if (response.hasOwnProperty('status')) {
            Snackbar.show({
                title: 'Reset password mail is sent.',
                duration: Snackbar.LENGTH_INDEFINITE,
                action: ({
                    title: 'Dismiss',
                    loading: true,
                    color: 'orange',
                    onPress: () => {
                        this.setModalVisible(!this.state.modalVisible);
                    }
                })
            });
        }
        if (this.state.email == '') {
            forgotPasswordMessage = this.setState({
                forgotPasswordMessage: response.errors.email,
            })
        } else {
            forgotPasswordMessage = this.setState({
                forgotPasswordMessage: response.errors.email[1],
            })
        }
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
        if (this.state.email == '') {
            this.setState({ emailError: 'Email is required' });
            validate = false;
        }
        if (this.state.password == '') {
            this.setState({ passwordError: 'Password is required' });
            validate = false
        }
        return validate;
    }

    validateRegister = () => {
        var validate = true;
        if (this.state.firstname == '') {
            this.setState({ firstnameError: 'Please enter first name' });
            validate = false;
        }
        if (this.state.lastname == '') {
            this.setState({ lastnameError: 'Please enter last name' });
            validate = false;
        }
        if (this.state.registerEmail == '') {
            this.setState({ registerEmailError: 'Please enter email' });
            validate = false;
        }
        if (this.state.registerPassword == '') {
            this.setState({ registerPasswordError: 'Please enter password' });
            validate = false
        }
        if (this.state.repeatPassword == '') {
            this.setState({ confirmPasswordError: 'Please reconfirm password' });
            validate = false
        }
        if (this.state.repeatPassword != this.state.registerPassword) {
            this.setState({ confirmPasswordError: 'Password does not match' });
            validate = false
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

    _renderTextInput = (label, onChangeText, errorMessage, secureTextEntry, inlineImage) => {
        return (
            <View>
                <TextInput onChangeText={(text) => { onChangeText(text) }}
                    // editable = {this.state.loginButtonPressed ? false : true}
                    secureTextEntry={secureTextEntry}
                    placeholder={label}
                    placeholderTextColor='grey'
                    inlineImageLeft={inlineImage}
                    inlineImagePadding={10}
                    style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 0, borderBottomColor: 'orange' }} />
                <FormValidationMessage>{errorMessage}</FormValidationMessage>
            </View>
        )
    }

    _renderPasswordInputLogin = (label, onChangeText, errorMessage, secureTextEntry, inlineImage) => {
        return (
            <View>
                <View style={styles.textBoxBtnHolder}>
                    <TextInput
                        style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 0, borderBottomColor: 'orange' }}
                        onChangeText={(text) => { onChangeText(text) }}
                        // editable = {this.state.loginButtonPressed ? false : true}
                        secureTextEntry={secureTextEntry}
                        placeholder={label}
                        placeholderTextColor='grey'
                        inlineImageLeft={inlineImage}
                        inlineImagePadding={10}
                        secureTextEntry={this.state.hidePasswordLogin} />
                    <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.manageLoginPasswordVisibility}>
                        <Icon name={(this.state.hidePasswordLogin) ? 'visibility' : 'visibility-off'} />
                    </TouchableOpacity>
                </View>
                {/* <TextInput onChangeText={(text) => { onChangeText(text) }}
                    // editable = {this.state.loginButtonPressed ? false : true}
                    secureTextEntry={secureTextEntry}
                    placeholder={label}
                    placeholderTextColor='grey'
                    inlineImageLeft={inlineImage}
                    inlineImagePadding={10}
                    style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 0, borderBottomColor: 'orange' }} />
                    <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.managePasswordVisibility}>
                    <Icon name={(this.state.hidePassword) ? 'visibility' : 'visibility-off'} />
                </TouchableOpacity> */}
                <FormValidationMessage>{errorMessage}</FormValidationMessage>
            </View>
        )
    }

    _renderPasswordInputSignup = (label, onChangeText, errorMessage, secureTextEntry, inlineImage) => {
        return (
            <View>
                <View style={styles.textBoxBtnHolder}>
                    <TextInput
                        style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 0, borderBottomColor: 'orange' }}
                        onChangeText={(text) => { onChangeText(text) }}
                        // editable = {this.state.loginButtonPressed ? false : true}
                        secureTextEntry={secureTextEntry}
                        placeholder={label}
                        placeholderTextColor='grey'
                        inlineImageLeft={inlineImage}
                        inlineImagePadding={10}
                        secureTextEntry={this.state.hidePasswordSignup} />
                    <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.manageSignupPasswordVisibility}>
                        <Icon name={(this.state.hidePasswordSignup) ? 'visibility' : 'visibility-off'} />
                    </TouchableOpacity>
                </View>
                {/* <TextInput onChangeText={(text) => { onChangeText(text) }}
                    // editable = {this.state.loginButtonPressed ? false : true}
                    secureTextEntry={secureTextEntry}
                    placeholder={label}
                    placeholderTextColor='grey'
                    inlineImageLeft={inlineImage}
                    inlineImagePadding={10}
                    style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 0, borderBottomColor: 'orange' }} />
                    <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.managePasswordVisibility}>
                    <Icon name={(this.state.hidePassword) ? 'visibility' : 'visibility-off'} />
                </TouchableOpacity> */}
                <FormValidationMessage>{errorMessage}</FormValidationMessage>
            </View>
        )
    }



    renderLoginModule = () => {
        return (
            <View style={{ width: '100%', margin: 10 }}>
                {this._renderTextInput('Email*',
                    (text) => { this.setState({ email: text }) },
                    this.state.emailError, false, 'email')}
                {this._renderPasswordInputLogin('Password*',
                    (text) => { this.setState({ password: text }) },
                    this.state.passwordError, this.state.hidePasswordLogin, 'lock')}
                <FormValidationMessage>{this.state.loginErrorMessage}</FormValidationMessage>
                <Button
                    fontSize={18}
                    title='Login'
                    loading={this.state.loginButtonPressed ? true : false}
                    disabled={this.state.loginButtonPressed ? true : false}
                    buttonStyle={{ backgroundColor: 'orange', marginBottom: 20, marginTop: 20 }}
                    onPress={() => {
                        this.resetStateVar();
                        if (this.validate()) {
                            this.setState({
                                loginButtonPressed: true
                            });
                            this.login();
                        }
                    }} />
            </View>
        )
    }

    renderRegisterModule = () => {
        return (<Modal
            animationType="slide"
            transparent={false}
            visible={this.state.registerModalVisible}
            onRequestClose={() => {
                this.setRegisterModalVisible(!this.state.registerModalVisible);
                // this.setState({forgotPasswordMessage: ''})
            }}>
            <ScrollView>
                <View style={{ margin: 22 }}>
                    <Text style={{ fontSize: 40, fontWeight: '300' }}>Register</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <FormLabel labelStyle={styles.userTypeStyle}>User type</FormLabel>
                        <this.userTypeSelection />
                    </View>
                    {this._renderTextInput('First name',
                        (text) => { this.setState({ firstname: text }) },
                        this.state.firstnameError, false, 'face')}
                    {this._renderTextInput('Last name',
                        (text) => { this.setState({ lastname: text }) },
                        this.state.lastnameError, false, 'face')}
                    {this._renderTextInput('Email',
                        (text) => { this.setState({ registerEmail: text }) },
                        this.state.registerEmailError, false, 'email')}
                    {this._renderTextInput('Password',
                        (text) => { this.setState({ registerPassword: text }) },
                        this.state.registerPasswordError, this.state.hidePasswordSignup, 'lock')}
                    {this._renderPasswordInputSignup('Confirm Password',
                        (text) => { this.setState({ repeatPassword: text }) },
                        this.state.confirmPasswordError, true, 'lock')}
                    <Button
                        fontSize={12}
                        title='Sign up'
                        disabled={this.state.signupButtonPressed ? true : false}
                        loading={this.state.signupButtonPressed ? true : false}
                        buttonStyle={{ backgroundColor: 'orange' }}
                        onPress={() => {
                            this.resetStateVar();
                            if (this.validateRegister()) {
                                this.signup();
                                this.setState({
                                    signupButtonPressed: true
                                });
                            }
                        }} />
                </View>
            </ScrollView>
        </Modal>
        )
    }

    renderForgotPassword = () => {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    this.setState({ forgotPasswordMessage: '' })
                }}>
                <View style={{ margin: 22 }}>
                    <View style={{ width: '100%', margin: 10 }}>
                        <Text style={{ fontSize: 20 }}>Forgot Password</Text>
                        <Text style={{ marginTop: 10 }}>Please enter your email address. You will receive a link to create a new password via email.</Text>
                        <TextInput
                            style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 10, marginBottom: 2 }}
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                            placeholder='Email address'
                            inlineImageLeft='email'
                            inlineImagePadding={10} />
                        <FormValidationMessage>{this.state.forgotPasswordMessage}</FormValidationMessage>
                        <Button
                            fontSize={12}
                            title='Send now'
                            disabled={this.state.forgotPasswordButtonPressed ? true : false}
                            loading={this.state.forgotPasswordButtonPressed ? true : false}
                            onPress={() => {
                                this.setState({
                                    forgotPasswordButtonPressed: true
                                });
                                this.forgotPasssword();
                            }}
                            buttonStyle={{ backgroundColor: 'orange', marginTop: 20 }} />
                    </View>
                </View>
            </Modal>
        )
    }

    manageLoginPasswordVisibility = () => {
        this.setState({ hidePasswordLogin: !this.state.hidePasswordLogin });
    }

    manageSignupPasswordVisibility = () => {
        this.setState({ hidePasswordSignup: !this.state.hidePasswordSignup });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        flex: 1
    },
    line: {
        width: '32%',
        height: 1,
        borderWidth: 1,
        borderColor: '#b7b7b7',
        marginTop: 10,
        marginRight: 5,
        marginBottom: 10
    },
    logo: {
        height: '35%',
        width: '30%',
        // backgroundColor: 'green'

    },
    facebookBtn: {
        width: '90%',
        height: 40,
        marginTop: 0
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

    },
    visibilityBtn:
    {
        position: 'absolute',
        right: 3,
        height: 25,
        width: 35,
        padding: 5
    },

    btnImage:
    {
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
    },
    textBoxBtnHolder:
    {
        position: 'relative',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    textBox:
    {
        fontSize: 18,
        alignSelf: 'stretch',
        height: 45,
        paddingRight: 45,
        paddingLeft: 8,
        borderWidth: 1,
        paddingVertical: 0,
        borderColor: 'grey',
        borderRadius: 5
    },
})