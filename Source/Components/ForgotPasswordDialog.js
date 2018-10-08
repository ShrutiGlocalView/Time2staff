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
import EmailController from '../Controller/EmailController';
import { Button, Icon, FormInput, FormValidationMessage, FormLabel,SocialIcon } from 'react-native-elements';
import Snackbar from 'react-native-snackbar';

export default class ForgotPasswordDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
           forgotPasswordMessage:'',
           email : props.email
        }
    }

    render(){
        return( <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        this.props.setModalVisible(!this.props.modalVisible);
                        this.setState({forgotPasswordMessage: ''})
                    }}>
                    <View style={{margin: 22}}>
                            <View style={{ width: '100%', margin: 10 }}>
                                <Text style={{fontSize: 20}}>Forgot Password</Text>
                                <Text style={{marginTop: 10}}>Please enter your email address. You will receive a link to create a new password via email.</Text>
                                <TextInput
                                    style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 10, marginBottom: 2 }}
                                    onChangeText={(email) => this.setState({ email })}
                                    value={this.props.email}
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
                            </View>
                        </View>
                </Modal>)
    }


    forgotPasssword = async () =>{
        response = await EmailController.ForgotPassword(this.state.email);
        if(response.hasOwnProperty('status')){
            this.setState({
                buttonPressed: false,
            })
            Snackbar.show({
                title: 'Reset password mail is sent.',
                duration: Snackbar.LENGTH_INDEFINITE,
                action: ({
                    title: 'Dismiss',
                    color: 'orange',
                    onPress: () => {
                        this.setModalVisible(!this.state.modalVisible);
                    }
                })
              });
        }
        if (this.state.email == ''){
            forgotPasswordMessage = this.setState({
                forgotPasswordMessage: response.errors.email,
            })
        }else{
        forgotPasswordMessage = this.setState({
            forgotPasswordMessage: response.errors.email[1],
        })}
        console.log(response.errors.email);
    }

}