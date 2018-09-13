import React,{Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import HomeStack from '../Navigators/HomeStack';
import {Icon} from 'react-native-elements';

export default class HomePage extends Component{
    constructor(props){
        super(props)
    }

    render(){
     return(<View style = {{backgroundColor:'#000000',height:'100%'}}>
               <View style={{position:'absolute',alignSelf:'flex-end',bottom:30,zIndex:1000, right: 10}}>
               <TouchableOpacity onPress={() => {alert("you pressed it...")}}>
               <Icon
                reverse
                name='home-map-marker'
                type='material-community'
                color='#ff7f2a'
                size= {25}
                />
            </TouchableOpacity>
               </View>      
               <HomeStack />     
            </View>
           )   
    }
}