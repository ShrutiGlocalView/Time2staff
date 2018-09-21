import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import {Button} from 'react-native-elements';
export default class ConfirmEmail extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     modalVisible: true,
        // }
    }

    // setModalVisible(visible) {
    //     this.setState({modalVisible: visible});
    //   }
    render() {
        return (
            <View style={{ margin: 22 }}>
                <View style={{ width: '100%', margin: 10 }}>
                    <Text style={{ fontSize: 20 }}>Verify your email</Text>
                    <Text style={{ marginTop: 10 }}>Please check your inbox for a verification email.
                                Click the link in the email to verify your email address.</Text>
                    <Button
                        fontSize={12}
                        title='Continue'
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        buttonStyle={{ backgroundColor: 'orange', marginTop: 20 }} />
                </View>
            </View>

        )
    }
}
