import React from 'react';
import {View, Text} from 'react-native';
import SearchableDropDown from 'react-native-searchable-dropdown';
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

export default class AddNewSkills extends React.Component {
    // render() {
    //     return (
    //         <View>
    //             <Text style = {{alignSelf : 'center'}}>Search for the job titles will be here</Text>
    //         </View>
    //     )
    // }

    render() {
        return(
        <SearchableDropDown
            // onTextChange={(text) =>  alert(text)}
            onItemSelect={(item) =>  alert(JSON.stringify(item))}
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
            items={items}
            defaultIndex={2}
            placeholder="Placeholder."
            resetValue={false}
            underlineColorAndroid='transparent' />
        )}
}