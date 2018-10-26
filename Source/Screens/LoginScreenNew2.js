import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    AsyncStorage,
    ActivityIndicator
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
import UserCalls from '../Controller/UserCalls';

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
            isLoading: false,
        }
    }

    onLoginSuccess = async (response) => {
        this.setState({
            loginErrorMessage: '',
            loginButtonPressed: false,
            isLoading: true
        })
        console.log(response);
        console.log(response.data.user_data);
        try {
            USER_EMAIL = response.data.user_data.email;
            USER_ID = response.data.user_data.id;
            USER_ROLE = response.data.user_data.roles[0].title;

            await AsyncStorage.setItem('User_Email', USER_EMAIL);
            await AsyncStorage.setItem('User_Id', JSON.stringify(USER_ID));
            await AsyncStorage.setItem('User_Role', USER_ROLE);

            await this.showUserDetails();

        } catch (e) {
            console.log(e);
        }

        this.setState({
            isLoading: false
        })
        this.props.navigation.navigate('App')
    }

    onLoginFailed = (response) => {
        console.log(response);
        if (response.status == 'pending') {
            Snackbar.show({
                title: 'Account is not verified.\nResend verification email?',
                duration: Snackbar.LENGTH_LONG,
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

    showUserDetails = async () => {
        console.log("I am in...")
        var role = await AsyncStorage.getItem('User_Role')
        var user_id = await AsyncStorage.getItem('User_Id')

        var role = await AsyncStorage.getItem('User_Role')
        var user_id = await AsyncStorage.getItem('User_Id')
        if (role == "Staff") {
            var response = await UserCalls.getStaffDetails(user_id)
            console.log(response);
            await AsyncStorage.setItem('User_Data', JSON.stringify(response));
        } else {
            var response = await UserCalls.getClientDetails(user_id)
            console.log(response);
            await AsyncStorage.setItem('User_Data', JSON.stringify(response));
        }
    }

    render() {
        if(this.state.isLoading){
            return(
                <ActivityIndicator size='large'/>
            )
        }
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
        // what is the use of body here???
        let loginCall = LoginService.EmailLogin(this.state.email, this.state.password)
            .then((data) => { this.onLoginSuccess(data) })
            .catch((error) => {
                this.onLoginFailed(error);
                console.log('error is');
                console.log(error);
            })
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
                <View style={styles.textBoxBtnHolder}>
                    <TextInput
                        style={{ alignItems: 'center', borderBottomColor: 'orange', borderBottomWidth: 1, marginBottom: 0 }}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        placeholder='Password'
                        secureTextEntry={this.state.hidePasswordLogin}
                        inlineImageLeft='lock'
                        inlineImagePadding={10} />
                    <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.manageLoginPasswordVisibility}>
                        <Icon name={(this.state.hidePasswordLogin) ? 'visibility' : 'visibility-off'} />
                    </TouchableOpacity>
                </View>
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
        return (
            <Modal
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

    manageLoginPasswordVisibility = () => {
        this.setState({ hidePasswordLogin: !this.state.hidePasswordLogin });
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
    visibilityBtn:
    {
        position: 'absolute',
        right: 3,
        height: 25,
        width: 35,
        padding: 5
    },
    textBoxBtnHolder:
    {
        position: 'relative',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
})
