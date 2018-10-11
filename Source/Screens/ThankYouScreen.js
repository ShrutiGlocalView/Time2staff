import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { Icon, Button } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/FontAwesome';

export default class ThankYouScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { isFinished: false }
    }

    componentWillMount(){
        if (1) //something we can check to show splash screen
        {
            setTimeout( ()=> {
            this.stateChange();       
            }, 1000);
        }
    }

    stateChange = () => {
        this.setState({isFinished: true})
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon
                    name={this.state.isFinished ? 'check' : 'circle'}
                    type={this.state.isFinished ? 'simple-line-icon' : 'feather'}
                    color='#ef820d'
                    size={100} />
                <View>
                    <Text style={styles.welcome}>You are all done!</Text>
                    <Text style={styles.instructions}>Thank you for registering with us.</Text>
                </View>
                <Button
                        small
                        rightIcon={{ name: 'arrow-forward' }}
                        title='Move to dashboard'
                        backgroundColor='#ef820d'
                        buttonStyle={{width: 200, height: 40, }}
                        onPress={()=> {
                            this.props.navigation.navigate('homeStack')
                        }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        alignSelf: 'stretch',
        // backgroundColor: 'white'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})