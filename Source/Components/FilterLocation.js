import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  FlatList,
  Text,
  Modal,
  AsyncStorage,
} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import {Card, ListItem, Button} from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Slider } from 'react-native-elements';


const locations = [{
    "id" : 1,
    "locationName": "Bengaluru"
},{
    "id" : 2,
    "locationName": "Chennai"
},{
    "id" : 3,
    "locationName": "Delhi"
},{
    "id" : 4,
    "locationName": "Noida"
},{
    "id" : 5,
    "locationName": "Pune"
}]

const items = [
    {
      name: "Location",
      id: 0,
      children: [{
        "id" : 1,
        "name": "Bengaluru"
    },{
        "id" : 2,
        "name": "Chennai"
    },{
        "id" : 3,
        "name": "Delhi"
    },{
        "id" : 4,
        "name": "Noida"
    },{
        "id" : 5,
        "name": "Pune"
    }]
    },
  ]

export default class FilterLocation extends Component {

    constructor(){
        super()
        this.state = {
          selectedItems: [],
          selectedLocations: []
        }
        this.SectionedMultiSelect;
      }

      componentDidMount(){
        console.log(this.props.state);
      }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
        var temp = selectedItems;
      };

      onSelectedItemObjectsChange = (selectedItemObjects) => {
        var name =[];

        selectedItemObjects.forEach((element) => {
            name.push({locationName:element.name})
        });
        console.log('start------>>>')
        selectedItemObjects.forEach((element) => {
            console.log(element);
        })
        this.setState({
            selectedLocations : name
        });
        // this.state.selectedLocations.forEach((element) => {
        //     console.log("data is as \n" + JSON.stringify(element))
        // });
      }

      onConfirm = () => {
        // const {goBack} = this.props.navigation;
        //   console.log("you pressed it...");
        //   console.log(this.state.selectedLocations);
        //   goBack()
        this.refreshList()
    }

    _storeData = async () => {
        try {
          await AsyncStorage.setItem('key', JSON.stringify(this.state.selectedLocations));
        } catch (error) {
          // Error saving data
        }
      }

    render(){
        return (
            <View>
              <SectionedMultiSelect
              items={items}
              uniqueKey='id'
              subKey='children'
              selectText='Choose some things...'
              showDropDowns={true}
              readOnlyHeadings={true}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
              onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}
              onConfirm = {this.onConfirm}
              ref={SectionedMultiSelect => this.props.locationFilter = SectionedMultiSelect}
            />
          </View>
        );
      }
}
