import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

const filternames = [{
    "id": 1,
    "filtername": "Food service management"
}, {
    "id": 2,
    "filtername": "Food science"
}, {
    "id": 3,
    "filtername": "Local foods"
}, {
    "id": 4,
    "filtername": "Food pricings"
}];

export default class ProfessionalInfo extends Component {

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    borderWidth: 1,
                    borderColor: "#f1f1f1",
                }}
            />
        );
    }
    saveDetails = () => {
        alert("you pressed it!!!")
        // this.props.navigation.navigate('professionalInfo')
    }
    render() {
        return (
            <View style={{ backgroundColor: '#ffffff', height: '100%' }}>
                <Text style={styles.header}>Professional Info</Text>
                <ScrollView>
                    <View style={styles.containerSkills}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.heading}>Your Skills</Text>
                            <Icon
                                style={styles.iconAdd}
                                name='add-circle'
                                type='ionicons'
                                color='#517fa4'
                                size={30}
                                onPress={() => this.props.navigation.navigate('AddSkills')}
                            />
                        </View>
                        <View style={styles.containerList}>
                            <FlatList
                                data={filternames}
                                ItemSeparatorComponent={this.FlatListItemSeparator}
                                renderItem={({ item }) =>
                                    <View style={styles.containerListItem}>
                                        <Text style={styles.listItemTextLeft}>{item.filtername}
                                        </Text>
                                        <Text style={styles.listItemTextRight}></Text>
                                        <Icon
                                            style={styles.listItemIcon}
                                            name='delete-circle'
                                            type='material-community'
                                            color='#517fa4'
                                            size={25}
                                        />
                                    </View>}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                    </View>
                    <View style={styles.containerDocument}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.heading}>Your Documents</Text>
                            <Icon
                                style={styles.iconAdd}
                                name='add-circle'
                                type='ionicons'
                                color='#517fa4'
                                size={30}
                                onPress={() => DocumentPicker.show({
                                    filetype: [DocumentPickerUtil.allFiles()],
                                }, (error, res) => {
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
                        <View style={styles.containerList}>
                            <FlatList
                                data={filternames}
                                ItemSeparatorComponent={this.FlatListItemSeparator}
                                renderItem={({ item }) =>
                                    <View style={styles.containerListItem}>
                                        <Text style={styles.listItemTextLeft}>{item.filtername}
                                        </Text>
                                        <Text style={styles.listItemTextRight}></Text>
                                        <Icon
                                            style={styles.listItemIcon}
                                            name='delete-circle'
                                            type='material-community'
                                            color='#517fa4'
                                            size={25}
                                        />
                                    </View>}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                    </View>
                    <View style= {{flexDirection: 'row'}}>
<View style={{ alignSelf:'flex-start',bottom:0,zIndex:1000, left: 10, marginTop: 30, marginBottom: 0}}>
            <TouchableOpacity 
               onPress={() => {
                  this.props.navigation.goBack();
                  }}>
                <Icon
                reverse
                name='arrow-left'
                type='material-community'
                color='#ff7f2a'
                size= {25}
                />
            </TouchableOpacity>
          </View>
<View style={{ alignSelf:'flex-end',bottom:0,zIndex:1000, left: 210, right:10, marginTop: 30, marginBottom: 0}}>
            <TouchableOpacity 
               onPress={() => {
                // if (this.validate())
                  this.saveDetails()}}>
                <Icon
                reverse
                name='check'
                type='material-community'
                color='#ff7f2a'
                size= {25}
                />
            </TouchableOpacity>
          </View>
      </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 40,
        margin: 10
    }, containerSkills: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20
    }, iconAdd: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20
    }, heading: {
        marginLeft: 10,
        marginRight: 'auto',
        fontSize: 18,
        fontWeight: 'bold'
    }, containerList: {
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        borderColor: '#D3D3D3'
    }, containerListItem: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        flexDirection: 'row'
    }, listItemTextLeft: {
        fontSize: 16,
    }, listItemTextRight: {
        marginLeft: 'auto',
        marginRight: 15,
    }, listItemIcon: {
        marginRight: 10
    }, containerDocument: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20
    },
});