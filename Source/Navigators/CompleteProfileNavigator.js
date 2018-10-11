import {
    createStackNavigator
} from 'react-navigation';
import BillingInfo from '../Screens/BillingInfo';
import ProfessionalInfo from '../Screens/ProfessionalInfo';
import PersonalInfo from '../Screens/PersonalInfo';
import IndicatorComponent from '../Screens/IndicatorComponent';
import privacyPolicyScreen from '../Screens/PrivacyPolicyScreen';
import ThankyouScreen from '../Screens/ThankYouScreen';
import HomeStack from './HomeStack';

var CompleteProfileNavigator = createStackNavigator({
    // personalInfo: PersonalInfo,
    personalInfo: IndicatorComponent,
    billingInfo: BillingInfo,
    privacyPolicy: privacyPolicyScreen,
    thankyouScreen: ThankyouScreen,
    homeStack: HomeStack
},{
    headerMode: 'none'
});

export default CompleteProfileNavigator;