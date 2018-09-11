import React,{Component} from 'react';
import SearchableDropDown from 'react-native-searchable-dropdown';
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
import PopupDialog, {DialogTitle} from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/Ionicons';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import {createStackNavigator} from 'react-navigation';


let docUrl = "file://whatever/com.bla.bla/file.ext"

export default class AddSkills extends Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true,
            experienceVar: 0
        }
    } 

    componentDidMount(){
    return fetch('http://dev.time2staff.com/api/job_titles')
        .then((response) => response.json())
        .then((responseJson) => {

        this.setState({
            isLoading: false,
            dataSource: responseJson,
        }, function(){
            console.log(responseJson)
        });

        })
        .catch((error) =>{
        console.error(error);
        });
    }

    pressedItem = () => {
    console.log(JSON.stringify(item))
    }

    incrementExp  = () => {
    this.setState(prevState => ({ experienceVar: prevState.experienceVar + 1 }));
    }

    decrementExp  = () => {
    if(this.state.experienceVar > 0)
        this.setState(prevState => ({ experienceVar: prevState.experienceVar - 1 }));
    }
    
    
    render() {
    if(this.state.isLoading){
    return(
        <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator/>
        </View>
    )}
    
    return(
    <View style={{flex: 1, paddingTop:20}}>
    <SearchableDropDown
        // onTextChange={(text) =>  alert(text)}
        // onItemSelect={(item) =>  alert(JSON.stringify(item))}
        onItemSelect= {() => {
            this.popupDialog.show();
        }}
        containerStyle={{
            padding: 5
        }}
        textInputStyle={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5
        }}
        itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius:5
        }}
        itemTextStyle={{
        color: '#222'
        }}
        itemsContainerStyle={{
            maxHeight: 400
        }}
        items = {items}
        defaultIndex={2}
        placeholder="Placeholder."
        resetValue={false}
        underlineColorAndroid='transparent' />
        <PopupDialog 
            style = {styles.popupDialogContainer}
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            dialogTitle={<Text
                style = {styles.popupTitle}>
                    Job Title Here
                </Text> }
        >                   
            
            <Text 
            style = {styles.popupText}
            numberOfLines = {1}>
                skills here
            </Text>
            <View 
            style = {styles.popupView}>
                <Icon 
                name="ios-remove-circle-outline" 
                color="#4F8EF7" 
                size= {32} 
                style= {styles.popupIcon}
                onPress= {() => this.decrementExp()} />
                <Text 
                style = {{fontSize: 30, padding: 4}}>
                    {this.state.experienceVar}
                </Text>
                <Icon 
                    name="ios-add-circle-outline" 
                    color="#4F8EF7" 
                    size= {32} 
                    style= {styles.popupIcon} 
                    onPress= {() => this.incrementExp()} />
            </View>
            <Button 
            title = 'Done'
            onPress = {() => alert("pressed")} />
        </PopupDialog>
    </View>
    );
    }
}

var  items  = [
    {
        id: 1,
        name: 'Javascript'
    },
    {
        id: 2,
        name: 'Java'
    },
    {
        id: 3,
        name: 'Ruby'
    },
    {
        id: 4,
        name: 'React Native'
    },
    {
        id: 5,
        name: 'PHP'
    },
    {
        id: 6,
        name: 'Python'
    },
    {
        id: 7,
        name: 'Go'
    },
    {
        id: 8,
        name: 'Swift'
    },
];





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