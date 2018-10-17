import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    AsyncStorage
} from 'react-native';
import {
    Button,
    Icon,
    FormInput,
    FormValidationMessage,
    FormLabel,
    SocialIcon
} from 'react-native-elements';
import FacebookButton from '../Components/FacebookButton';
import GoogleButton from '../Components/GoogleButton';
import Snackbar from 'react-native-snackbar';
import RegisterUser from '../Components/RegisterUser';
import VerifyEmail from '../Components/VerifyEmail'
import EmailController from '../Controller/EmailController';
import ForgotPasswordDialog from '../Components/ForgotPasswordDialog';
import LoginService from '../Controller/LoginCalls';
import { defaultPostCall } from '../Controller/AxioController';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginButtonPressed: false,
            modalVisible: false,
            registerModalVisible: false,
            verifyEmailVisibility: false,
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            loginErrorMessage: '',
            hidePasswordLogin: true,

        }
    }

    onLoginSuccess = (response)=>{

        this.setState({
          loginErrorMessage: '',
          loginButtonPressed: false
         })
          USER_EMAIL = response.data.user_data.email;
          USER_ID = response.data.user_data.id;
          TERMS = response.data.user_data.terms;
          this.props.navigation.navigate('App',{ USER_EMAIL: USER_EMAIL, USER_ID: USER_ID, TERMS: TERMS });

        this.setState({
            loginErrorMessage: '',
            loginButtonPressed: false
        })
        USER_EMAIL = response.data.user_data.email;
        USER_ID = response.data.user_data.id;
        let TERMS = response.data.user_data.terms;
        this.props.navigation.navigate('App',
            { USER_EMAIL: USER_EMAIL, USER_ID: USER_ID, TERMS: TERMS });

    }

    onLoginFailed = (response) => {
        if (response.status == 'pending') {
            Snackbar.show({
                title: 'Account is not verified.\nResend verification email?',
                duration: Snackbar.LENGTH_INDEFINITE,
                action: ({
                    title: 'Resend',
                    color: 'orange',
                    onPress: () => {
                        response = EmailController.ResendEmail(this.state.email);
                    }
                })
            });
        }
        this.setState({
            loginErrorMessage: response.message,
            loginButtonPressed: false
        })
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../../Assets/logo_round.png')}
                    resizeMode='contain' />
                <View style={styles.lineContainer}>
                    <View style={styles.line}></View>
                    <Text style={{ color: 'grey', fontSize: 15 }}>Log in with</Text>
                    <View style={styles.line}></View>
                </View>
                <View style={styles.socialIcons}>
                    <FacebookButton
                        onLoginSuccess={() => this.props.navigation.navigate('CompleteProfileNavigator')} />
                    <GoogleButton />
                </View>
                <Text style={styles.textOr}>or</Text>
                {this.renderLoginModule()}
                {this.renderForgotPassword()}
                {this.renderRegisterModule()}
                <View style={styles.bottomBar}>
                    <TouchableOpacity onPress={() => { this.setState({ registerModalVisible: true }); }}>
                        <Text style={styles.bottomBarText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.setState({ modalVisible: true }) }}>
                        <Text style={styles.bottomBarText}>Forgot password</Text>
                    </TouchableOpacity>
                </View>
                <VerifyEmail
                    modalVisible={this.state.verifyEmailVisibility}
                    setModalVisible={() => this.setState({ verifyEmailVisibility: false })}
                    onContinuePress={() => this.setState({
                        registerModalVisible: false,
                        verifyEmailVisibility: false
                    })
                    } />
            </View>
        );
    }


    login = async () => {
        let body = { username: this.state.email, password: this.state.password };
        let loginCall = LoginService.EmailLogin(this.state.email, this.state.password)
            .then((data) => { this.onLoginSuccess(data) })
            .catch((error) => { this.onLoginFailed(error) })
    }



    renderLoginModule = () => {
        return (
            <View style={{ margin: 10 }}>
                <TextInput
                    style={{ alignItems: 'center', borderBottomColor: 'orange', borderBottomWidth: 1, marginBottom: 10 }}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    placeholder='Email'
                    inlineImageLeft='email'
                    inlineImagePadding={10} />
                <TextInput
                    style={{ alignItems: 'center', borderBottomColor: 'orange', borderBottomWidth: 1, marginBottom: 0 }}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    placeholder='Password'
                    secureTextEntry={true}
                    inlineImageLeft='lock'
                    inlineImagePadding={10} />
                <FormValidationMessage>{this.state.loginErrorMessage}</FormValidationMessage>

                <Button
                    fontSize={18}
                    title='Login'
                    loading={this.state.loginButtonPressed ? true : false}
                    disabled={this.state.loginButtonPressed ? true : false}
                    buttonStyle={{ backgroundColor: 'orange', marginTop: 20 }}
                    onPress={() => {
                        this.setState({ loginButtonPressed: true })
                        this.login();
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
                this.setState({ registerModalVisible: false });
            }}>
            <RegisterUser onSuccess={() => {
                this.setState({
                    verifyEmailVisibility: true,
                    registerModalVisible: false
                });
            }} />
        </Modal>)
    }

    renderForgotPassword = () => {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => { this.setState({ modalVisible: false }) }}>
                <ForgotPasswordDialog email={this.state.email}
                    setModalVisible={(visibility) => this.setState({ modalVisible: visible })}
                />
            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    logo: {
        height: '35%',
        width: '30%',
        alignSelf: 'center',
    },
    lineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textOr: {
        alignSelf: 'center',
        color: 'grey',
        fontSize: 18,
    },
    line: {
        width: '30%',
        height: 1,
        borderWidth: 1,
        borderColor: '#b7b7b7',
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    socialIcons: {
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'center',
    },
    bottomBar: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        bottom: 0,
        marginTop: 20,
        padding: 10,
    },
    bottomBarText: {
        color: 'black',
        fontSize: 15
    },
})
