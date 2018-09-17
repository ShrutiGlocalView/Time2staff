import React, {Component} from 'react';
import {
    Text,
    View, 
    TextInput, 
    StyleSheet,
    Image,
    TouchableOpacity} from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: ''};
    }

    render(){
        return(
            <View style= {{width: '100%', height: '100%', alignItems: 'center', backgroundColor: '#ffffff'}}>
               
                    <Image
                    style ={styles.logo}
                    source={require('../../Assets/logo_round.png')}
                    resizeMode = 'contain'/>

                <View style = {{flexDirection: 'row',  borderColor: '#ffffff',marginTop: 10}}>
                <Button
                    small
                    icon={{name: 'face', type: 'action', buttonStyle: styles.buttonStyle }}
                    title='Log in'
                    borderRadius={10}
                    backgroundColor='black'/>
                <View style = {{width: 1, height: '100%', borderWidth: 1, borderColor: 'grey'}}></View>
                <Button
                    small
                    icon={{name: 'face', type: 'action', buttonStyle: styles.buttonStyle }}
                    title='Sign up'
                    borderRadius={10}
                    backgroundColor='orange'/>
                </View>
                <View style = {{width: '90%', margin: 10}}>
                <TextInput
                    style={{borderColor: 'gray', borderBottomWidth: 1, margin: 10}}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    placeholder= 'Username or Email'
                    inlineImageLeft='email'
                    inlineImagePadding={10}/>
                    <TextInput
                    style={{borderColor: 'gray', borderBottomWidth: 1, margin: 10}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    placeholder= 'Password'
                    secureTextEntry= {true}
                    inlineImageLeft='lock'
                    inlineImagePadding={10}/>
                    <TouchableOpacity 
                    style = {{alignSelf: 'flex-end', margin: 10}}>
                        <Text>Fotgot password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style = {{alignSelf: 'center', margin: 10}}
                    onPress={() => {}}>
                        <Icon
                        reverse
                        name='arrow-right'
                        type='material-community'
                        color='#ff7f2a'
                        size={25}
                        />
                </TouchableOpacity>

                </View>
                    {/* <TextInput
                    style={{width: '80%', borderColor: 'gray', borderBottomWidth: 1, margin: 10}}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    placeholder= 'Username or Email'
                    inlineImageLeft='email'
                    inlineImagePadding={10}/>
                    <TextInput
                    style={{width: '80%', borderColor: 'gray', borderBottomWidth: 1, margin: 10}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    placeholder= 'Password'
                    secureTextEntry= {true}
                    inlineImageLeft='lock'
                    inlineImagePadding={10}/>
                    <TouchableOpacity style = {{alignSelf: 'flex-end'}}>
                        <Text>Fotgot password</Text>
                    </TouchableOpacity> */}
                </View>
        );
    }
}

const styles = StyleSheet.create({
    logo:{
        height:'35%',
        width:'35%',
        marginTop: 30,
        marginBottom: 20,
      },
})