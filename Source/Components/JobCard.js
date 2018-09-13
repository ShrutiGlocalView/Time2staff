import React, {Component} from 'react';
import { 
    StyleSheet,
    Platform,
    View,
    FlatList,
    Text,
    TouchableOpacity,
  } from 'react-native';
  import {Card, ListItem, Button} from 'react-native-elements';
  import { Icon } from 'react-native-elements'

  

export default class JobCard extends Component {
    constructor(props){
        super(props);
        this.state = ({
            isSelected: false,
        })
    }

    _onPressStarIcon = () => {
        if(this.state.isSelected != true){
         this.setState({isSelected: true})
        }
         else{
         this.setState({isSelected: false})
   
         } 
      }
      
    render(){
        return (
            <Card
            containerStyle = {{width: '100%', margin: 0, padding: 0}}
        >
            <Text style={{marginTop: 10, marginLeft: 10, fontSize: 20, fontWeight: '900',  width: '70%'}}>{this.props.data.job}
            </Text>
            <Text style={{marginLeft: 10, marginTop: 2, fontSize: 12, fontWeight: '500', width: '70%'}}>
            {this.props.data.color}
            </Text>
            <View style = {{flexDirection: 'row', width: '70%', marginLeft: 10, marginTop: 2, }}>
            <Text style={{fontSize: 12, fontWeight: '200', width: '40%', margin: 1, }}>{this.props.data.experience}</Text>
            <Text style={{fontSize: 12, fontWeight: '200', width: '55%', margin: 1, textAlign: 'center',}}>{this.props.data.location}</Text>
            </View>
            <View style = {{width: '100%', height: 1, marginTop: 100, backgroundColor: 'red'}}></View>
            <View style = {{flexDirection: 'row', height: 50}}>
            <TouchableOpacity onPress={this._onPressStarIcon}>
                <Icon
                reverse
                name={this.state.isSelected ? 'star' : 'star-outlined'}
                type='entypo'
                color='blue'
                size= {15}
                />
            </TouchableOpacity>
            </View>
        </Card>
        )}
}