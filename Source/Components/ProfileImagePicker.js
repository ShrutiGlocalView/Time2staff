import React, { Component } from 'react'
import { Avatar } from 'react-native-elements';

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
            <Avatar
                large
                rounded
                containerStyle={{ alignSelf: 'center', marginBottom: 12 }}
                icon={{ name: 'user', type: 'font-awesome' }}
                source={this.state.avatarSource}
                onPress={() => this.onAvatarClick()}
                activeOpacity={0.7}
            />
        )
    }
}