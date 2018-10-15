import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
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
import {defaultPostCall} from '../Controller/AxioController';

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
        console.log(response);
        this.setState({
          loginErrorMessage: '',
          loginButtonPressed: false
         })
          let USER_EMAIL = response.data.user_data.email;
          let USER_ID = response.data.user_data.id;
          let TERMS = response.data.user_data.terms;
          this.props.navigation.navigate('App',
                    { USER_EMAIL: USER_EMAIL, USER_ID: USER_ID, TERMS: TERMS });
        
    }

    onLoginFailed = (response)=>{
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
                <View style={{ alignItems: 'center', height: '100%', width: '100%', padding: 16, }}>
                    <Image style={styles.logo}
                        source={require('../../Assets/logo_round.png')}
                        resizeMode='contain' />
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={styles.line}></View>
                        <Text style={{ color: 'grey', fontSize: 15 }}>Log in with</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <FacebookButton onLoginSuccess={()=>
                                            this.props.navigation.navigate('CompleteProfileNavigator')
                                        }/>

                        <GoogleButton/>
                    </View>
                    <Text style={{ alignSelf: 'center', color: 'grey', fontSize: 18 }}>or</Text>
                    {this.renderLoginModule()}
                    {this.renderForgotPassword()}
                    {this.renderRegisterModule()}
                   
                    <VerifyEmail modalVisible={this.state.verifyEmailVisibility}
                        setModalVisible={()=>this.setState({ verifyEmailVisibility: false })}
                        onContinuePress={()=>this.setState({ registerModalVisible: false ,
                                                             verifyEmailVisibility:false})
                                        } />
                </View>
                <View style={styles.bottomBar}>
                    <TouchableOpacity onPress={() => { this.setState({ registerModalVisible: true }); }}>
                        <Text style={{ color: 'black', fontSize: 15 }}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { this.setState({ modalVisible: true }) }}>
                        <Text style={{ color: 'black', fontSize: 15 }}>Forgot password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    
   
    login = async() => {
        let body = {username:this.state.email,password:this.state.password};
        let loginCall = LoginService.EmailLogin(this.state.email,this.state.password)
           .then((data) => {this.onLoginSuccess(data)})
           .catch((error)=>{this.onLoginFailed(error)})
    }

    
    
    renderLoginModule = () => {
        return (
            <View style={{ width: '100%', margin: 10 }}>
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
                    buttonStyle={{ backgroundColor: 'orange', marginBottom: 20, marginTop: 20 }}
                    onPress={() => {
                        this.setState({loginButtonPressed: true})
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
                <RegisterUser onSuccess = {()=>{
                    this.setState({verifyEmailVisibility: true,
                                   registerModalVisible: false });
                 }}/>
           </Modal>)
    }

    renderForgotPassword = () => {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {this.setState({ modalVisible: false })}}>
                 <ForgotPasswordDialog email={this.state.email}
                        setModalVisible={(visibility)=>this.setState({ modalVisible: visible })}
                         />
            </Modal>
        )
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
    },
    bottomBar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        alignItems: 'center',
        position: 'absolute',
        height: '5%',
        width: '90%',
        bottom: 10
     },

    
})
