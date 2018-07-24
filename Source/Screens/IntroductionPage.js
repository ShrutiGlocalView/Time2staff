import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Linking
} from 'react-native';
import {Button, Tile} from 'react-native-elements';
import LinkedInModal from 'react-native-linkedin'
import {
  LoginButton,
  AccessToken,
  LoginManager
} from 'react-native-fbsdk';

export default class IntroductionPage extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
   
      Linking.getInitialURL().then((url) => {
         
        if (url) {
          console.log('Initial url is: ' + url);
        }
      }).catch(err => console.error('An error occurred', err));
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
                    alert(data.accessToken.toString())
                  }
                )
              }
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
                  onPress={()=>{this.props.navigation.navigate('LoginPage',{signUpType:"Staff",signUp:true})}}
                  textStyle = {{color:'white',
                                fontSize:25}}
          />
          <Button rounded
                  raised
                  large
                  containerViewStyle={styles.buttonContainer}
                  title = 'I need staff'
                  buttonStyle={[styles.button,{backgroundColor:'white'}]}
                  onPress={()=>{this.props.navigation.navigate('LoginPage',{signUpType:"Client",signUp:true})}}
                  textStyle = {{color:'black',
                                fontSize:25}}
         />
         <Button
                 onPress={()=>{this.props.navigation.push('LoginPage',{signUpType:"",signUp:false})}}
                 buttonStyle={{backgroundColor: "transparent"}}
                 title = 'Already have an account? Sign In'
                 textStyle = {styles.signIn}
                 
                
        />
        
        
         
            <LoginButton
              onLoginFinished={(error,result)=>this.onLoginFinished(error,result)}
              onLogoutFinished={() => alert("logout.")}/>
         
       
        </View>)
  }
}

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
