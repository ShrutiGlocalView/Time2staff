import React, { Component } from 'react'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from 'react-native-google-signin';
import{AsyncStorage} from 'react-native';

export default class GoogleButton extends Component{
    constructor(props){
        super(props);
        this.state = {user:null};
        //console.log('i am running');
        GoogleSignin.configure({ 
            webClientId: "966508246263-43vkhmudcmti3jnbv3c41r51pdpok87o.apps.googleusercontent.com",
            scopes: ["https://www.googleapis.com/auth/drive.appdata"]});
    }

    render(){
        return( <GoogleSigninButton
                            style={{ width: 60, height: 60, borderRadius: 10 }}
                            size={GoogleSigninButton.Size.Icon}
                            color={GoogleSigninButton.Color.Light}
                            onPress={() => { this.signIn() }} />)
    }

    componentDidMount() {
    }


    signIn = async () => {
        //console.log('working right');
        var user, token;
        // console.log('hiii');
        GoogleSignin.signIn().then((response)=>{
            console.log('ok');
            console.log(response);
        }).catch((error)=>{
            console.log('error');
            console.log(error);
        });
//         token = user.accessToken;
//         console.log("ACCESS TOKEN HERE: s", token);
//         await AsyncStorage.setItem('token_key', user.accessToken);
//         const gotToken = await AsyncStorage.getItem('token_key');
//         alert("token is:" + " " + gotToken);
//         this.setState({ user:user });
        //this.getCountries();
    };
}