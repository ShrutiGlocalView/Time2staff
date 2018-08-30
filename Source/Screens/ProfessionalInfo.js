import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Linking,
  DatePickerAndroid,
  Picker,
  ScrollView,
  Text,
  ListView,
  Modal
} from 'react-native';
import {Avatar,Button,FormLabel,FormInput,List,ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  createStackNavigator,
} from 'react-navigation';



export default class ProfessionalInfo extends Component {
  constructor(props) {
    super(props);
    this.state={
        modalJobTitle:'',
        modalSkill:'',
        modalExp:'',
        modalvisible:false
    }
  }
 
  componentDidMount() {
      
  }

  // iconPressed = () => {
  //   this.props.navigation.navigate('AddNewSkills')
  //   alert("Hello...");
    
  // }

  render() {
    const { navigate } = this.props.navigation;
    var Job_title =[{name:'chef',skills:['0','3']},
              {name:'waiter',skills:['1','2']},
              {name:'bartender',skills:['1','4']},
              {name:'sous chef',skills:['2','3']}
             ];

    var skills = [{name:'alcohol license',id:'0'},
              {name:'hard working',id:'1'},
              {name:'public engagement',id:'2'},
              {name:'polite',id:'3'},
              {name:'intelligent',id:'4'}
             ];
    
    return (
        <View style = {styles.container}>
        <View style = {styles.container1}>
         <FormLabel labelStyle = {styles.labelStyle}>My Skills</FormLabel>
         <Icon
              name="ios-add-circle" 
              color="#4F8EF7" 
              size= {28} 
              style= {{ marginLeft: 'auto',  }}
              onPress ={null}
                              
              /> 
         </View>

         <ScrollView>
         <List containerStyle={{backgroundColor:'white',borderRadius:5,borderTopWidth: 0, borderBottomWidth: 0}}
               wrapperStyle = {{borderTopWidth:0,marginTop:0,backgroundColor:'red'}}> 
            {Job_title.map((item,i)=>{
                  return(
                  <View key ={i}>
                    <ListItem title = {item.name} 
                              subtitle = 'experience'
                              key ={i}
                              badge={{ value: 3, textStyle: { color: 'orange' } }}/>
                  </View>
                  )})
             }
         </List>

         </ScrollView>
         <View style = {{height:16}}/>
         <FormLabel labelStyle = {styles.labelStyle}>My Documents</FormLabel>
         <View style={{height:'40%',backgroundColor:'white',borderRadius:5}}></View>

        </View>
        )
  }
}

const styles= StyleSheet.create({
  container: {
    padding:16,

    backgroundColor: '#D4cdb1',
    
  },
  
  labelStyle:{
    color:'#265b91',
    fontSize:18,
    marginTop:0,marginBottom:8,marginLeft:6,marginRight:6
  },

  container1: {
    flexDirection: 'row',
    alignItems: 'center'
  }  
});