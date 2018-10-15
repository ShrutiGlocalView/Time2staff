import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

var ImagePicker = require('react-native-image-picker');


export default class ProfileImagePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: '',
        }
    }

    onAvatarClick = () => {
        console.log('AvtarClicked');
        var options = {
            title: 'Select Avatar',
            customButtons: [
                { name: 'fb', title: 'Choose Photo from Facebook' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    render() {
        return (
            <View>
            <View style={styles.container}>
                <Avatar
                    large
                    rounded
                    containerStyle={{ alignSelf: 'center', }}
                    icon={{ name: 'user', type: 'font-awesome'}}
                    source={this.state.avatarSource}
                    onPress={() => this.onAvatarClick()}
                    activeOpacity={0.7}
                />
                <Icon
                    rounded
                    size={15}
                    name={'edit'}
                    containerStyle={styles.icon}
                    onPress={() => this.onAvatarClick()} />
            </View>
            <Text style= {{alignSelf: 'center',justifyContent: 'center',}}>Add Profile Image</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 1,
    },
    icon: {
        backgroundColor: '#DBDBDB',
        position: 'absolute',
        borderRadius: 50,
        padding: 5,
        right: 0,
        bottom: 0,
    },
});