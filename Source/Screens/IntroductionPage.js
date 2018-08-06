import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Linking,
  AsyncStorage
} from 'react-native';

import {Button, Tile} from 'react-native-elements';
import LinkedInModal from 'react-native-linkedin';
import {
  LoginButton,
  AccessToken,
  LoginManager
} from 'react-native-fbsdk';
import EmailController from '../Controller/EmailController';
import SaveProfile from '../Controller/SaveProfile';
export default class IntroductionPage extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
   
//       Linking.getInitialURL().then((url) => {
         
//         if (url) {
//           console.log('Initial url is: ' + url);
//         }
//       }).catch(err => console.error('An error occurred', err));
      this.getCountries();
    
   }

   getCountries = async()=>{
     try{
       var response = await SaveProfile.getCountries();
       //console.log(response.countries);
       await AsyncStorage.setItem('Countries',JSON.stringify(response.countries));
      

     }catch(e){
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
  
  
  initUser=async(token)=> {
    var response = await fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token);
    var responseJson = await response.json();
    var loginResponse = await EmailController.UserLogin(responseJson.email,responseJson.id);
    console.log(loginResponse);
  }

  renderLinkedButton=()=>{
    return(
     <Image style={{width:'50%',height:40,padding:10,borderRadius:5}}
                  resizeMethod='resize'
                  source={require('../../Assets/LISignIn.png')}
                  />
    )
  }          


  render() {
    

    return (
        <View style={styles.container}>
          
          <Image
              style ={styles.logo}
              source={require('../../Assets/logo_round.png')}
              resizeMode = 'contain'/>
          <Button rounded
                  raised
                  large
                  containerViewStyle={styles.buttonContainer}
                  title = 'I want a job'
                  buttonStyle={[styles.button,{backgroundColor: "#265b91"}]}
                  onPress={()=>{this.props.navigation.navigate('LoginPage',{signUpType:"0",signUp:true})}}
                  textStyle = {{color:'white',
                                fontSize:25}}
          />
          <Button rounded
                  raised
                  large
                  containerViewStyle={styles.buttonContainer}
                  title = 'I need staff'
                  buttonStyle={[styles.button,{backgroundColor:'white'}]}
                  onPress={()=>{this.props.navigation.navigate('LoginPage',{signUpType:"1",signUp:true})}}
                  textStyle = {{color:'black',
                                fontSize:25}}
         />
         <Button
                 onPress={()=>this.props.navigation.navigate('App')}
                 buttonStyle={{backgroundColor: "transparent"}}
                 title = 'Already have an account? Sign In'
                 textStyle = {styles.signIn}
                 
                
        />
        
        
         
            <LoginButton
              onLoginFinished={(error,result)=>this.onLoginFinished(error,result)}
              onLogoutFinished={() => alert("logout.")}
              readPermissions={['public_profile','email']}/>
         
       
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

const styles= StyleSheet.create({
  container: {
    height:'100%',
    backgroundColor: '#D4cdb1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    height:'40%',
    width:'40%',
  },
  button:{
      height:60,
      borderRadius:30
  },
  buttonContainer:{backgroundColor: "transparent",
    marginTop: 20,
    width:'90%'
  },
  signIn:{color:'#265b91',
               fontSize:20,
               textDecorationLine:'underline'
  }
});
