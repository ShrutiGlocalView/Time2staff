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
import LoginService from '../Controller/LoginCalls';
export default class RegisterUser extends Component{

    constructor(props){
        super(props)
        this.state = {
             firstname:'',
             lastname:'',
             email:'',
             password:'',
             repeatPassword: '',
             firstnameError:'',
             lastnameError:'',
             emailError:'',
             passwordError:'',
             repeatPasswordError:'',
             signupButtonPressed: false,
             checked:0,
             userRole:'Buisness'
         }
    }

    userType = ['Staff','Buisness'];

    render(){
        return(<View style={{ margin: 22 }}>
                  <Text style={{ fontSize: 40, fontWeight: '300' }}>Register</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <FormLabel labelStyle={styles.userTypeStyle}>User type</FormLabel>
                    {this._renderUserTypeSelection()}
                    </View>
                {this._renderTextInput('First name',
                    (text) => { this.setState({ firstname: text }) },
                    this.state.firstnameError, false, 'face')}
                {this._renderTextInput('Last name',
                    (text) => { this.setState({ lastname: text }) },
                    this.state.lastnameError, false, 'face')}
                {this._renderTextInput('Email',
                    (text) => { this.setState({ email: text }) },
                    this.state.emailError, false, 'email')}
                {this._renderTextInput('Password',
                    (text) => { this.setState({ password: text }) },
                    this.state.passwordError, true, 'lock')}
                {this._renderTextInput('Repeat Password',
                    (text) => { this.setState({ repeatPassword: text }) },
                    this.state.confirmPasswordError, true, 'lock')}
                <Button
                    fontSize={12}
                    title = 'Sign up'
                    loading = {this.state.signupButtonPressed ? true : false}
                    disabled = {this.state.signupButtonPressed ? true : false}
                    buttonStyle = {{ backgroundColor: 'orange' }}
                    onPress = {() => {
                        if (this.validate()) {
                            this.signup();
                            this.setState({
                                signupButtonPressed: true
                            });
                        }
                    }} />
            </View>)
    }

    _renderUserTypeSelection = () => {
        return (
            this.userType.map((data, key) => {
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

        return (<View>
                <TextInput onChangeText={ (text) => { onChangeText(text) }}
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

    validate = (text) => {
        var validate = true;
        const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mailReg.test(text) === true) {
            this.setState({ emailError: 'Enter a valid email' });
            validate = false;
        } else {
            this.setState({ emailError: '' });
            validate = true;
        }
        if (this.state.firstname == '') {
            this.setState({ firstnameError: 'Mandatory Field' });
            validate = false
        } else {
            this.setState({ firstnameError: '' });
            validate = true
        }

        if (this.state.lastname == '') {
            this.setState({ lastnameError: 'Mandatory Field' });
            validate = false
        } else {
            this.setState({ lastnameError: '' });
            validate = true
        }

        if (this.state.email == '') {
            this.setState({ emailError: 'Mandatory Field' });
            validate = false;
        } else {
            this.setState({ emailError: '' });
            validate = true;
        }
        if (this.state.password == '') {
            this.setState({ passwordError: 'cannot have an empty password' });
            validate = false
        } else {
            this.setState({ passwordError: '' });
            validate = true
        }
        if (this.state.repeatPassword != this.state.password) {
            this.setState({ confirmPasswordError: 'Password does not match' });
            validate = false
        } else {
            this.setState({ confirmPasswordError: '' });
            validate = true
        }
        return validate;
    }


    signup = async () => {
        var response;
        LoginService.Register(this.state.email, this.state.password, this.state.userRole, this.state.firstname, this.state.lastname)
        .then((response)=>{
                //console.log("ok"); 
                this.props.onSuccess();            

        }).catch((error)=>{
                console.log("error");
                emailErrorVar = response.errors.email;
                passwordErrorVar = response.errors.password;
                this.validate();
                if (emailErrorVar != '') {
                    this.setState({emailError: emailErrorVar})
                }
                if (passwordErrorVar != '') {
                    this.setState({passwordError: passwordErrorVar})
                }
        }).finally(()=>{
            console.log('finally');
            this.setState({signupButtonPressed: false,})
        })


    }
}

const styles = StyleSheet.create({
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
})
