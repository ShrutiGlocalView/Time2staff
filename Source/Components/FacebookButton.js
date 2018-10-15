import React, { Component } from 'react';
import {
    LoginButton,
    AccessToken,
    LoginManager
} from 'react-native-fbsdk';
import{StyleSheet,View} from 'react-native';
import {
    SocialIcon
} from 'react-native-elements';

export default class FacebookButton extends Component{
    constructor(props){
        super(props);
        console.log(props);
    }

    render(){
        return(<SocialIcon type='facebook'
                           onPress = {()=>this.facebookLogin()}
                           onLongPress = {()=>this.facebookLogin()}/>
              )
    }

    
    facebookLogin=()=>{
        
          LoginManager.logInWithReadPermissions(['public_profile'])
          .then((result)=> {
                if (result.isCancelled) {
                  alert('Login was cancelled');
                } else {
                  this.props.onLoginSuccess();
                }
          }).catch((error)=>{
            alert('Login failed with error: ' + error);  
          });
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
         console.log('initUser');
        var response = await fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token);
        var responseJson = await response.json();
        //var loginResponse = await EmailController.UserLogin(responseJson.email, responseJson.id);
        console.log(loginResponse);
    }

}

const styles = StyleSheet.create({

    facebookBtn: {
        width: '90%',
        height: 40,
        marginTop: 0
    },
})