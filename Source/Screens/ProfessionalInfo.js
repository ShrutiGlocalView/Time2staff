import React, { Component } from 'react';

import {
    View, 
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator, 
      FlatList, 
      ScrollView, 
      Text, 
      Button
        } from 'react-native';
import { FormLabel, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';        
export default class ProfessionalInfo extends Component{
    constructor(props) {
        super(props);
        this.state={
            modalJobTitle:'',
            modalSkill:'',
            modalExp:'',
            modalvisible:false
        }
    }
    
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

    documentPicker = () => { }
    
    
    return (
        <ScrollView contentContainerStyle = {{padding: 10, backgroundColor:'#D4cdb1' }}>
        <View style = {styles.container1}>
            <FormLabel labelStyle = {styles.labelStyle}>My Skills</FormLabel>
            <Icon
                name="ios-add-circle" 
                color="#4F8EF7" 
                size= {28} 
                style= {{ marginLeft: 'auto',  }}
                onPress ={() => this.props.navigation.navigate('AddSkills')}             
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
            <View style = {styles.container1}>
            <FormLabel labelStyle = {styles.labelStyle}>My Documents</FormLabel>
            <Icon
                name="ios-add-circle" 
                color="#4F8EF7" 
                size= {28} 
                style= {{ marginLeft: 'auto',  }}
                onPress ={ () => DocumentPicker.show({
                    filetype: [DocumentPickerUtil.allFiles()],
                  },(error,res) => {
                    // Android
                    console.log(
                       res.uri,
                       res.type, // mime type
                       res.fileName,
                       res.fileSize
                    );
                    docUrl = res.uri
                    console.warn(docUrl)
                  })}
                              
                /> 
            </View>
            <ScrollView>
                <List containerStyle={{backgroundColor:'white',borderRadius:5,borderTopWidth: 0, borderBottomWidth: 0, marginBottom: 40}}
                    wrapperStyle = {{borderTopWidth:0,marginTop:0,backgroundColor:'red'}}> 
                {Job_title.map((res,i)=>{
                        return(
                        <View key ={i}>
                        <ListItem title = {res.fileName} 
                                    subtitle = 'experience'
                                    key ={i}
                                    badge={{ value: 3, textStyle: { color: 'orange' } }}/>
                        </View>
                        )})
                    }
                </List>
            </ScrollView>
        </ScrollView>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        backgroundColor: '#D4cdb1',  
    },

    labelStyle:{
        color:'#265b91',
        fontSize:18,
        marginTop:0,marginBottom:8,marginLeft:6,marginRight:6
    },

    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    popupTitle: {
        fontSize: 20,
        fontWeight: '500',
        padding: 15,
        backgroundColor: '#F57F17',
        textAlign: 'center',
        color: 'white',
    },
    popupDialogContainer: {
        alignItems: 'center', 
        color: 'green',
    },
    popupText: {
        fontSize: 10,
        fontWeight: '500',
        padding: 15,
        margin: 10,
        width: 100,
        backgroundColor: '#D4cdb1',
        borderRadius: 40,
        color: 'black',
    },
    popupView: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    popupIcon: {
        marginHorizontal: 20,
    }

});