import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar
} from 'react-native';
import requestLocationPermission,{getLocation} from '../Controller/Location';

export default class HomeMap extends React.Component {
 constructor(props){
  super(props)
 }

 componentWillMount(){

 }



 render() {
   const { region } = this.props;
   //console.log(region);

   return (
     <View style ={styles.container}>
       <MapView
         style = {styles.map}
         region = {{
           latitude: 37.78825,
           longitude: -122.4324,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
         }}
       >
       </MapView>
       <Text style={styles.text}>myText</Text>
     </View>
   );
 }
}

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,

   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   height:'100%',
   width:'100%'
 },
 text:{
  zIndex:100,
  color:'black',
  fontWeight:'bold',
  backgroundColor:'rgba(1,1,1,0.5)'
 }
});
