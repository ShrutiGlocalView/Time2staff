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
import LoginService from '../Controller/LoginCalls';

export default class ForgotPasswordDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
           forgotPasswordMessage:'',
           linkedEmail:props.email,
           sendLinkButtonPressed:false 
        }
    }

    render(){
        return(<View style={{margin: 22}}>
                            <View style={{ width: '100%', margin: 10 }}>
                                <Text style={{fontSize: 20}}>Forgot Password</Text>
                                <Text style={{marginTop: 10}}>Please enter your email address. You will receive a link to create a new password via email.</Text>
                                <TextInput
                                    style={{ borderColor: 'gray', borderBottomWidth: 1, margin: 10, marginBottom: 2 }}
                                    onChangeText={(text) => this.setState({ linkedEmail:text})}
                                    value={this.state.linkedEmail}
                                    placeholder='Email address'
                                    inlineImageLeft='email'
                                    inlineImagePadding={10} />
                                <FormValidationMessage>{this.state.forgotPasswordMessage}</FormValidationMessage>
                                <Button
                                    loading = {this.state.sendLinkButtonPressed}
                                    fontSize={12}
                                    title='Send now'
                                    onPress={() => {this.forgotPasssword()}}
                                    buttonStyle={{ backgroundColor: 'orange',  marginTop: 20 }} />
                            </View>
                        </View>
                )
    }


    forgotPasssword = async () =>{
        this.setState({sendLinkButtonPressed:true})
        LoginService.ForgotPassword(this.state.linkedEmail)
        .then((response)=>{
          console.log('ok');
          Snackbar.show({
                title: 'Reset password mail is sent.',
                duration: Snackbar.LENGTH_LONG,
                action: ({
                    title: 'Dismiss',
                    color: 'orange',
                    onPress: () => {
                        this.props.setModalVisible(false);
                    }
                })
              });  
          })
        .catch((error)=>{
            console.log(error),
            this.setState({forgotPasswordMessage:"error"})
          })
        .finally(()=>{
            console.log('finally')
            this.setState({sendLinkButtonPressed:false})
        })    
//         response = await EmailController.ForgotPassword(this.state.email);
//         if(response.hasOwnProperty('status')){
//             Snackbar.show({
//                 title: 'Reset password mail is sent.',
//                 duration: Snackbar.LENGTH_INDEFINITE,
//                 action: ({
//                     title: 'Dismiss',
//                     color: 'orange',
//                     onPress: () => {
//                         this.setModalVisible(!this.state.modalVisible);
//                     }
//                 })
//               });
//         }
//         if (this.state.email == ''){
//             forgotPasswordMessage = this.setState({
//                 forgotPasswordMessage: response.errors.email,
//             })
//         }else{
//         forgotPasswordMessage = this.setState({
//             forgotPasswordMessage: response.errors.email[1],
//         })}
//         console.log(response.errors.email);
    }

}