import React, { Component } from 'react';
import {
    LoginButton,
    AccessToken,
    LoginManager
} from 'react-native-fbsdk';
import { StyleSheet, View } from 'react-native';
import {
    SocialIcon
} from 'react-native-elements';

export default class FacebookButton extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            // <SocialIcon type='facebook'
            //     onPress={() => {
            //         console.log("ButtonPressed....")
            //         this.facebookLogin();
            //     }}
            //     onLongPress={() => this.facebookLogin()} />
            //  running in case of facebook app not installed...
            <LoginButton
                onLoginFinished={
                    (error, result) => {
                        if (error) {
                            console.log("login has error: " + JSON.stringify(error));
                        } else if (result.isCancelled) {
                            console.log("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                    console.log(data.accessToken.toString())
                                }
                            )
                        }
                    }
                }
                onLogoutFinished={() => console.log("logout.")} />
            //  <LoginButton
            //         publishPermissions={["email"]}
            //         onLoginFinished={
            //             (error, result) => {
            //             if (error) {
            //                 alert("Login failed with error: " + error.message);
            //             } else if (result.isCancelled) {
            //                 alert("Login was cancelled");
            //             } else {
            //                 alert("Login was successful with permissions: " + result.grantedPermissions)
            //             }
            //             }
            //         }
            //   onLogoutFinished={() => alert("User logged out")}/>
        )
    }

    facebookLogin = () => {
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    console.log('Login success with permissions: '
                        + result.grantedPermissions.toString());
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error);
            }
        );
    }

    // facebookLogin = () => {
    //     console.log("entered in facebookLogin()");
    //     LoginManager.logInWithReadPermissions(['public_profile'])
    //         .then((result) => {
    //             console.log(result);
    //             console.log("entered in loginManager");
    //             if (result.isCancelled) {
    //                 alert('Login was cancelled');
    //             } else {
    //                 console.log("result is:::")
    //                 // console.log(result);
    //                 // this.props.onLoginSuccess();
    //                 console.log('Login was successful with permissions: '
    //                     + result.grantedPermissions.toString());

    //             }
    //         }).catch((error) => {
    //             alert('Login failed with error: ' + error);
    //         });
    // }



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