import React, {Component} from 'react';
import {View, Text, Image ,StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import IntroductionPage from './IntroductionPage';
import jobTitlesController from '../Controller/jobTitlesController';

//const job_titles_request = new Request("http://dev.time2staff.com/api/job_titles");
    
export default class SplashScreen extends Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentWillMount() {

        this.getJobDetails();
        const { navigate } = this.props.navigation;
        if(1) //something we can check to show splash screen
           {
                setTimeout(function () {
                    navigate('Auth');
                }, 3000);
           }

    }

    getJobDetails = async()=>{
        var response = jobTitlesController.job_titles();
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
        backgroundColor: '#D4cdb1'
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