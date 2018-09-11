import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  FlatList,
  Text,
  Modal,
  Slider
} from 'react-native';
import JobCard from '../Components/JobCard';
import FilterLocation from '../Components/FilterLocation';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {Card,
        ListItem,
        Button,
        Icon,

} from 'react-native-elements';


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

const filternames = [{
    "id": 1,
    "filtername": "Fruit Name"
},{
    "id": 2,
    "filtername": "Color"
},{
    "id": 3,
    "filtername": "Quantity"
},{
    "id": 4,
    "filtername": "Location"
},];

const items1 = [{
    "id": 1,
    "job": "Software",
    "skill": ['coding','testing','reqiurement_analysis'],
    "experience":1,
    "location": "Delhi"
},{
    "id": 2,
    "job": "Web Development",
    "skill": ['coding','testing','reqiurement_analysis'],
    "experience":3,
    "location": "Pune"
},{
    "id": 3,
    "job": "App Development",
    "skill": ['Android','java','sdk', 'c++'],
    "experience":5,
    "location": "Bengaluru"
},{
    "id": 4,
    "job": "Android App Development",
    "skill": ['business process', 'outsourcing', 'operations', 'git'],
    "experience":5,
    "location": "Bengaluru"
},{
    "id": 5,
    "job": "Software developer",
    "skill": ['software development', 'software engineering', 'java', 'c++'],
    "experience":1,
    "location": "Chennai"
},{
    "id": 6,
    "job": "php developer",
    "skill": ['javascript', 'css', 'ajax', 'jquery', 'php'],
    "experience":3,
    "location": "Noida"
},{
    "id": 7,
    "job": "Software developer",
    "skill": ['Python', 'Ruby on Rails', 'software development'],
    "experience":2,
    "location": "Bengaluru"
},{
    "id": 8,
    "job": "Team lead: Server and Database",
    "skill": ['css', 'html', 'jquery', 'mysql', 'json', 'xml'],
    "experience":4,
    "location": "Delhi"
},{
    "id": 9,
    "job": "MS SQL DBA",
    "skill": ['sql dba', 'clustring', ],
    "experience":2,
    "location": "Noida"
},{
    "id": 10,
    "job": "Application Development",
    "skill": ['Linux', 'Hibernate', 'core java', 'shell scripting'],
    "experience":8,
    "location": "Pune"
},{
    "id": 11,
    "job": "Senior Software Developer",
    "skill": ['java', 'mysql', 'angular js', 'REST api','html5'],
    "experience":5,
    "location": "Chennai"
},{
    "id": 12,
    "job": "Software Test Engineer",
    "skill": ['test engineering', 'test planing', 'manual testing'],
    "experience":3,
    "location": "Chennai",
},{
    "id": 13,
    "job": "Quality Analyst",
    "skill": ['quality testing', 'selenium', 'DVB'],
    "experience":4,
    "location": "Bengaluru"
},{
    "id": 14,
    "job": "Software Testing",
    "skill": ['test planning', 'software testing', 'manual testing'],
    "experience":1,
    "location": "Chennai"
},{
    "id": 15,
    "job": "Android App Development",
    "skill": ['test planning', 'software testing', 'manual testing'],
    "experience":4,
    "location": "Noida"
},{
    "id": 16,
    "job": "Android App Development",
    "skill": ['java', 'mysql', 'angular js', 'REST api','html5'],
    "experience":3,
    "location": "Noida"
},{
    "id": 17,
    "job": "Software Development",
    "skill": ['css', 'html', 'jquery', 'mysql', 'json', 'xml'],
    "experience":2,
    "location": "Bengaluru"
},{
    "id": 18,
    "job": "Web Development",
    "skill": ['css', 'html', 'php', 'javascript'],
    "experience":1,
    "location": "Delhi"
},{
    "id": 19,
    "job": "Web Development",
    "skill": ['css', 'html', 'php', 'javascript'],
    "experience":2,
    "location": "Noida"
},{
    "id": 20,
    "job": "Web Development",
    "skill": ['css', 'html', 'php', 'javascript'],
    "experience":3,
    "location": "Delhi"
}];

export default class HomeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      PickerValueHolder : '',
      isSelected: false,
      modalVisible: false,
    }

    this.SectionedMultiSelect;
  }

  GetFlatListItem (item) {
  var str = JSON.stringify(item)
  switch(str){
      case '1':
      this.props.navigation.navigate('Filter1')
      break;

      case '2':
      this.props.navigation.navigate('Filter2')
      break;

      case '3':
      this.props.navigation.navigate('Filter3')
      break;

      case '4':
      this.SectionedMultiSelect._toggleSelector()
      break;
  }
  }

  functionFoo = () => {
      console.log("test");
  }

FlatListItemSeparator = () => {
   return (
     <View
       style={{
         margin: 5,
         backgroundColor: "#607D8B",

       }}
     />
   );
 }

 _onPressStarIcon = () => {
   if(this.state.isSelected != true){
    this.setState({isSelected: true})
   }
    else{
    this.setState({isSelected: false})

    }
 }

 setModalVisible(visible) {
  this.setState({modalVisible: visible});
}



  render()
   {
      return(
          <View>
         <View style = { styles.MainContainer }>
            <View style = {{flexDirection: 'row'}}>
              <FlatList
                  style = {{paddingBottom: 10}}
                  horizontal
                  data={ filternames }
                  ItemSeparatorComponent = {this.FlatListItemSeparator}
                  renderItem={({item}) => <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this,  item.id)} > {item.filtername} </Text>}
                  keyExtractor={(item, index) => index}
                />
            </View>
            </View>
            <FlatList
                  style = {{paddingBottom: 10, marginBottom: 100}}
                  data={ items1 }
                  ItemSeparatorComponent = {this.FlatListItemSeparator}
                  renderItem={({item}) => <JobCard data ={item}/>}
                  keyExtractor={(item, index) => index}
                />
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
                ref={SectionedMultiSelect => this.SectionedMultiSelect = SectionedMultiSelect}
              />
          </View>
      );
   }

   refreshList =()=>{
     //add filter function
     console.log('i am running');
     // var refreshList = filterFunction();
     // this.setState({list:refreshList})
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
       this.SectionedMultiSelect._toggleSelector();
       // const {goBack} = this.props.navigation;
       //   console.log("you pressed it...");
       //   console.log(this.state.selectedLocations);
       //   goBack()

   }

   _storeData = async () => {
       try {
         await AsyncStorage.setItem('key', JSON.stringify(this.state.selectedLocations));
       } catch (error) {
         // Error saving data
       }
     }

}

const styles = StyleSheet.create({
  MainContainer :{

      justifyContent: 'center',
      margin: 10,
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,

      },
      FlatListItemStyle: {
          marginTop: 15,
          padding: 10,
          fontSize: 18,
          height: 44,
          width:  125,
          borderWidth: 1,
          backgroundColor: 'transparent'
        },
});
