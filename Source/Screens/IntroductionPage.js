import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  AsyncStorage
} from 'react-native';
import { Button } from 'react-native-elements';

import {
  LoginButton,
  AccessToken,
} from 'react-native-fbsdk';
import EmailController from '../Controller/EmailController';

import {
  GoogleSignin,
  GoogleSigninButton
} from 'react-native-google-signin';

import SaveProfile from '../Controller/SaveProfile';

export default class IntroductionPage extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // only for iOS
      webClientId: "966508246263-43vkhmudcmti3jnbv3c41r51pdpok87o.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
      // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
      // accountName: '', // [Android] specifies an account name on the device that should be used
    })
  }

  signIn = async () => {
    var user, token;
    // console.log('hiii'); 
    user = await GoogleSignin.signIn();
    token = user.accessToken;
    console.log("ACCESS TOKEN HERE: s", token);
    await AsyncStorage.setItem('token_key', user.accessToken);
    const gotToken = await AsyncStorage.getItem('token_key');
    alert("token is:" + " " + gotToken);
    this.setState({ user });
    this.getCountries();

  };

  getCountries = async () => {
    try {
      var response = await SaveProfile.getCountries();
      //console.log(response.countries);
      await AsyncStorage.setItem('Countries', JSON.stringify(response.countries));
    } catch (e) {
      console.log(e)
    }
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
        }
      )
    }
  }

  initUser = async (token) => {
    var response = await fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token);
    var responseJson = await response.json();
    var loginResponse = await EmailController.UserLogin(responseJson.email, responseJson.id);
    console.log(loginResponse);
  }

  render() {
    return (
      <View style={styles.container}>

        <Image
          style={styles.logo}
          source={require('../../Assets/logo_round.png')}
          resizeMode='contain' />

        <View style={{ borderRadius: 60, borderWidth: 1, padding: 0, marginTop: 10 }}>

          <Button rounded
            raised
            large
            containerViewStyle={styles.buttonContainer}
            title='I want a job'
            buttonStyle={[styles.button, { backgroundColor: "#ff7f2a" }]}
            onPress={() => { this.props.navigation.navigate('LoginPage', { signUpType: "0", signUp: true }) }}
            textStyle={{
              color: 'white',
              fontSize: 15
            }}
          />

        </View>

        <View style={{ borderRadius: 60, borderWidth: 1, padding: 0, marginTop: 10 }}>

          <Button rounded
            raised
            large
            containerViewStyle={styles.buttonContainer}
            title='I need a staff'
            buttonStyle={[styles.button, { backgroundColor: '#ff7f2a' }]}
            onPress={() => { this.props.navigation.navigate('LoginPage', { signUpType: "1", signUp: true }) }}
            textStyle={{
              color: 'white',
              fontSize: 15
            }} />

        </View>

        <Button
          onPress={() => this.props.navigation.navigate('App')}
          buttonStyle={{ backgroundColor: "transparent" }}
          title='Already have an account? Sign In'
          textStyle={styles.signIn}
        />

        <LoginButton
          onLoginFinished={(error, result) => this.onLoginFinished(error, result)}
          onLogoutFinished={() => alert("logout.")}
          readPermissions={['public_profile', 'email']} />

        <GoogleSigninButton
          style={{ width: 200, height: 40, marginTop: 10 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => { this.signIn() }} />

      </View>
    )
  }
}
//this.props.navigation.push('LoginPage',{signUpType:"",signUp:false})
// LoginManager.logInWithReadPermissions(['public_profile']).then(
//   function(result) {
//       if (result.isCancelled) {
//           alert('Login was cancelled');
//       } else {
//           alert('Login was successful with permissions: '
//            + result.grantedPermissions.toString());
//       }
//    },function(error) {
//       alert('Login failed with error: ' + error);
//    });

//

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // backgroundColor: '#D4cdb1',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: '40%',
    width: '40%',
  },
  button: {
    height: 50,
    borderRadius: 30
  },
  buttonContainer: {
    backgroundColor: "transparent",
    marginRight: 2,
    marginLeft: 2,
    marginTop: 2,
    marginBottom: 2,
    width: '100%'
  },
  signIn: {
    color: '#265b91',
    fontSize: 20,
    textDecorationLine: 'underline'
  }
});
