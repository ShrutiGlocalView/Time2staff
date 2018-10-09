import {
    createStackNavigator
} from 'react-navigation';
import BillingInfo from '../Screens/BillingInfo';
import ProfessionalInfo from '../Screens/ProfessionalInfo';
import PersonalInfo from '../Screens/PersonalInfo';
import IndicatorComponent from '../Screens/IndicatorComponent';
import privacyPolicyScreen from '../Screens/PrivacyPolicyScreen';

var CompleteProfileNavigator = createStackNavigator({
    // personalInfo: PersonalInfo,
    personalInfo: IndicatorComponent,
    billingInfo: BillingInfo,
    privacyPolicy: privacyPolicyScreen
},{
    headerMode: 'none'
});

export default CompleteProfileNavigator;