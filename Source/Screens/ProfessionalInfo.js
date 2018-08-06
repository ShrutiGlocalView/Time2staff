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
  ListView
} from 'react-native';
import {Avatar,Button,FormLabel,FormInput,List,ListItem} from 'react-native-elements';
import InputField from '../Components/InputField';


export default class ProfessionalInfo extends Component {
  constructor(props) {
    super(props);
    this.state={
        firstName:'',
        lastName:'',
        sex:'M',
        dateOfBirth:'',
        address:'',
        zipcode:'',
        country:'',
        city:'',
        email:'',
        phoneNumber:'',
    }
  }
 
  componentDidMount() {
      
  }
  renderJob =(rowData, sectionID) =>{
    console.log(rowData);
    return(<View><ListItem title = {rowData.name} subtitle = 'subtitle' />
    </View>)
  }
  Job_title =[{name:'chef',skills:['0','3']},
              {name:'waiter',skills:['1','2']},
              {name:'bartender',skills:['1','4']}
             ]; 

  skills = [{name:'alcohol license',id:'0'},
            {name:'hard working',id:'1'},
            {name:'public engagement',id:'2'},
            {name:'polite',id:'3'},
            {name:'intelligent',id:'4'}
           ]

  render() {
    console.log(this.Job_title.length);
    return (
        <View style = {styles.container}>
         <FormLabel labelStyle = {styles.labelStyle}>My Skills</FormLabel>
         <View style={{height:'40%',backgroundColor:'white',borderRadius:5}}>
         <List> 
            <ListView renderRow = {(rowData,sectionID)=>this.renderJob(rowData,sectionID)}
                      dataSource = {this.Job_title}/> 
         </List>
         </View>
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
    marginTop:0,marginBottom:0,marginLeft:6,marginRight:6
  },
  
});
//             <TouchableOpacity style = {{height:30,width:'25%',backgroundColor:'red'}}
//                               onPress = {()=>this.showDatePicker()}/>