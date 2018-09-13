import React, {Component} from 'react';
import {View, 
        Text, 
        Image,
        StyleSheet,
        AsyncStorage
       } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import IntroductionPage from './IntroductionPage';
import jobTitlesController from '../Controller/jobTitlesController';
import SaveProfile from '../Controller/SaveProfile';
import requestLocationPermission,{getLocation} from '../Controller/Location';
//const job_titles_request = new Request("http://dev.time2staff.com/api/job_titles");
    
export default class SplashScreen extends Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentWillMount() {
        this.getCountries();    
        this.getJobDetails();
        this.getPermission();
        const { navigate } = this.props.navigation;
        if(1) //something we can check to show splash screen
           {
                setTimeout(function () {
                    navigate('Auth');
                }, 3000);
           }

    }

    getPermission = async()=>{
     //console.log(navigator);
     var granted = await requestLocationPermission();
     if(granted === 'granted'){
        await getLocation(navigator);
     }
    }

    getJobDetails = async()=>{
        var response = jobTitlesController.job_titles();
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

    render(){
       return (
           <View style = {styles.container}>
            <Image
              style ={styles.logo}
              source={require('../../Assets/logo_round.png')}
              resizeMode = 'contain'/>
                {/* <Text style = {styles.text}>Time2Staff</Text> */}
           </View>
       );
   }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#D4cdb1'
        backgroundColor: '#ffffff'

    },
    logo:{
        height:'50%',
        width:'50%',
      },
    text:{
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
    }
})