import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import SaveProfile from '../Controller/SaveProfile';

export default class BillingInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [],
      cardNumber: '',
      cardExpiry: '',
      cardType: '',
      holderName: '',
      cardCVC: '',
      isLoading: false,
    }
  }

  _onChange = (formData) => {
    console.log(JSON.stringify(formData));
    console.log(JSON.stringify(formData.valid));
    let cardData = formData.values;
    console.log(cardData);
    this.setState({ cardData: cardData });
  };
  _onFocus = (field) => console.log("focusing", field);

  componentDidMount() {
  }

  validate = () => {
    var validate = true;
    if (!this.state.cardData.valid) {
      console.log("number is not updated...")
      validate = false
    }
    return validate
  }

  saveDetails = async () => {
    const user_id = this.props.USER_ID();
    // console.log("Form data is: ")
    let yearprefix = '20';
    let cardCVC = this.state.cardData.cvc;
    let cardNumber = this.state.cardData.number;
    let cardExpiry = this.state.cardData.expiry;
    let holderName = this.state.cardData.name;
    let cardType = this.state.cardData.type;
    let date = [] = cardExpiry.split('/', 2)
    let month = date[0];
    let year = yearprefix + date[1]
    // console.log("hfjdgdgdgdbh::::")
    // console.log(cardCVC)
    // console.log(cardNumber)
    // console.log(cardExpiry)
    // console.log(holderName)
    // console.log(cardType)
    // // console.log(cardExpiry.split('/',2));
    // console.log(month);
    // console.log(year);
    response = await SaveProfile.cardDetails(user_id, cardCVC, cardNumber, month, year);
    console.log(response);
    this.setState({isLoading: false});
    if (response.status == 200) {
      this.props.onNextPressed();
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View styles={[styles.ActivityIndicatorContainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <View Style={styles.container}>
        <Text style={styles.header}>Billing Info</Text>
        <ScrollView>

          <CreditCardInput
            autoFocus
            requiresName
            requiresCVC

            horizontalScroll={false}
            cardScale={0.85}
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputStyle}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
            allowScroll={true}
            onFocus={this._onFocus}
            onChange={this._onChange} />

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
          <View style={{ alignSelf: 'flex-end', bottom: 0, zIndex: 1000, left: 210, right: 10, marginTop: 30, }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({isLoading: true});
                this.saveDetails()
                // if (this.validate()){
                //   this.saveDetails()
                // }
              }}>
              <Icon
                reverse
                name='arrow-right'
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
  container: {
    backgroundColor: '#ffffff',
    height: '100%'
  },
  ActivityIndicatorContainer: {
    flex:1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  header: {
    fontSize: 25,
    margin: 10
  },
  logo: {
    height: '40%',
    width: '40%',
  },
  button: {
    height: 60,
    borderRadius: 30,
    marginBottom: 50
  },
  buttonContainer: {
    backgroundColor: "transparent",
    marginTop: 20,
    width: '90%'
  },
  signIn: {
    color: '#265b91',
    fontSize: 20,
    textDecorationLine: 'underline'
  },
  picker: {
    width: '25%',
    backgroundColor: 'white',
    marginHorizontal: 0,
    marginVertical: 0
  },
  labelStyle: {
    margin: 0,
    padding: 0,
    color: '#265b91',
    fontSize: 18
  },
  textInputStyle: {
    borderBottomColor: '#265b91',
    borderBottomWidth: 2,
    padding: 0,
    margin: 0
  },

  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },

});