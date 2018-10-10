import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Icon, FormValidationMessage } from 'react-native-elements';
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
      isCardDataValid: false,
      errorMessage: '',
    }
  }

  _onChange = (formData) => {
    console.log(JSON.stringify(formData));
    let cardData = formData.values;
    let isCardDataValid = formData.valid;
    console.log(cardData);
    this.setState({
      cardData: cardData,
      isCardDataValid: isCardDataValid
    });
  };
  _onFocus = (field) => console.log("focusing", field);

  componentDidMount() {
  }

  resetStateVar = () => {
    this.setState({ errorMessage: '' })
  }

  validate = () => {
    var validate = true;
    console.log("validation message is:::")
    console.log(this.state.isCardDataValid)
    if (!this.state.isCardDataValid) {
      console.log("Invalid inputs")
      this.setState({ errorMessage: 'Invalid inputs' })
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
    // console.log(year);react-native sta
    response = await SaveProfile.cardDetails(user_id, cardCVC, cardNumber, month, year);
    console.log(response);
    this.setState({ isLoading: false });
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
            // inputStyle={styles.inputStyle}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
            allowScroll={true}
            onFocus={this._onFocus}
            onChange={this._onChange} />
          <FormValidationMessage>{this.state.errorMessage}</FormValidationMessage>


          <View style={styles.bottomStyle}>
            <View style={styles.buttonLeft}>
              <TouchableOpacity
                onPress={() => {
                  this.resetStateVar();
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
            <View style={styles.buttonCenter}>
              <TouchableOpacity
                onPress={() => {
                  this.props.onNextPressed();
                }}>
                <Text style={styles.buttonCenterText}>Skip this step</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRigth}>
              <TouchableOpacity
                onPress={() => {
                  this.resetStateVar();
                  if (this.validate()) {
                    this.setState({ isLoading: true });
                    this.saveDetails()
                  }
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
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  ActivityIndicatorContainer: {
    flex: 1,
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
  labelStyle: {
    margin: 0,
    padding: 0,
    color: '#265b91',
    fontSize: 18
  },
  bottomStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 110
  },
  buttonLeft: {
    alignSelf: 'flex-start',
    bottom: 0,
    zIndex: 1000,
    marginTop: 30,
    marginBottom: 0
  },
  buttonCenter: {
    alignSelf: 'center',
    bottom: 0,
    zIndex: 1000,
    marginTop: 30,
  },
  buttonRigth: {
    alignSelf: 'flex-end',
    bottom: 0,
    zIndex: 1000,
    marginTop: 30,
  },
  buttonCenterText: {
    backgroundColor: '#ff7f2a',
    padding: 15,
    color: '#ffffff',
    borderRadius: 25
  }
});