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


export default class VerifyEmail extends Component{
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
                        
                    }}>
                    <View style={{ width: '100%', margin: 10 }}>
                    <Text style={{ fontSize: 20 }}>Verify your email</Text>
                    <Text style={{ marginTop: 10 }}>Please check your inbox for a verification email.
                                Click the link in the email to verify your email address.</Text>
                    <Button
                        fontSize={12}
                        title='Continue'
                        onPress={() => {this.props.onContinuePress();
                        }}
                        buttonStyle={{ backgroundColor: 'orange', marginTop: 20 }} />
                    </View>
                </Modal>)
    }


    forgotPasssword = async () =>{
        response = await EmailController.ForgotPassword(this.state.email);
        if(response.hasOwnProperty('status')){
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