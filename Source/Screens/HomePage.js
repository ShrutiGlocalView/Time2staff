import React,{Component} from 'react';
import {View} from 'react-native';
import HomeStack from '../Navigators/HomeStack';
import {Icon} from 'react-native-elements';

export default class HomePage extends Component{
    constructor(props){
        super(props)
    }

    render(){
     return(<View style = {{backgroundColor:'#000000',height:'100%'}}>
               <View style={{position:'absolute',alignSelf:'flex-end',bottom:0,zIndex:1000}}>
                   <Icon    reverse
                          name='ios-american-football'
                          type='ionicon'
                          color='#517fa4'
                        />
               </View>      
               <HomeStack />     
            </View>
           )   
    }
}