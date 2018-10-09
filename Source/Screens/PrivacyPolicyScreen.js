import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';


export default class PrivacyPolicyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            policyText: 'SB MOH MAAYA HAI...',
            checked: false,
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: '#ffffff', height: '100%' }}>
                <Text style={styles.header}>Terms and Conditions</Text>
                <ScrollView>
                    {/* <Text>{this.state.policyText}</Text> */}
                    <Text style={{ margin: 10, padding: 10 }}>
                        1. The Parties.
    This contract is between

    Party #1 is the work service provider "TIME2STAFF"- which is the Company that possess the national license right to use the "Time2Staff" (*T2S) Webapp within the actual Territory.

    and Party #2 is the "CUSTOMER" -- which is the legal person or entity seeking for Workers (hereby called "Shift providers").

    Note:

    Provisions between the customer and the work service provider is not regulated by this agreement.

    The Parties acknowledge that Party #1 -T2S- is an independent contractor and not involved in any employer-employee relationship between the worker and the Shift Provider


    2. Effect of contract.
    This contract turns into effect only from the date when this contract is electronically signed/accepted by the shift provider through the time2staff webapp or app.


    3. Recitals.
    Time2Staff("T2S") operates and manages a web platform at www.time2staff.com (the "Webapp") and app on which a shift provider can seek for a worker by submitting a shift request. Once a Shift Request has been submitted, T2S then proposes the most suitable worker from its database (the "Database"). Once proposed, the Shift Provider is permitted to accept or reject Shift Rquest. The Customer will then choose the payment method, visa, mastercard, invoice or vipps(in Norway). T2S will hold a fixed recruitment fee per working hour submitted through the Webapp. Once the payment is collected. T2S will resubmit the part of the payment that is not T2S recruitment fee to the employer Frilans Finans AS.

    4. Defining terms.
    "Agreement" means this agreement together with any schedules or Annexures hereto, which may be amended from time to time agreed online, as agreed to by the Parties;

    "Annexure" means the request confirmed by the Customer confirming the acceptance of the Shift Request and forming part of this Agreement;

    "Shift Services" means the working services consisting of the Standard Working Package andany additional services that the Customer has requested in its Shift Request and shall include any ratification services the Shift Provider may be requested to provide resulting out of a Customer Dispute in accordance with the terms of this Agreement;

    "Shift Sevice Duration" means the estimated amount of time the platform will require to carry out the Shift Services in accordance with the Shift Request;

    "Shift Service Fee" means the total fee to be paid by the Customer for the Shift Services;
                    </Text>
                    
                        <CheckBox
                            title='I accept the Terms and Conditions'
                            textStyle= {{marginLeft: 20, paddingLeft: 10}}
                            containerStyle ={{borderWidth: 1,}}
                            checkedColor='#ff7f2a'
                            checked={this.state.checked}
                            onPress={() => this.setState({ checked: !this.state.checked })}
                        />

                </ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'flex-start', bottom: 0, zIndex: 1000, left: 10, marginTop: 30, marginBottom: 0 }}>
                        <TouchableOpacity
                            onPress={() => {
                                // this.props.navigation.goBack();
                                this.props.onPrevPressed();
                            }}>
                            <Icon
                                reverse
                                name='arrow-left'
                                type='material-community'
                                color='#ff7f2a'
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignSelf: 'flex-end', bottom: 0, zIndex: 1000, left: 210, right: 10, marginTop: 30, marginBottom: 0 }}>
                        <TouchableOpacity
                            onPress={() => {
                                // if (this.validate())
                                // this.saveDetails()
                                this.props.onNextPressed();
                            }}>
                            <Icon
                                reverse
                                name='check'
                                type='material-community'
                                color='#ff7f2a'
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        margin: 10
    },
});