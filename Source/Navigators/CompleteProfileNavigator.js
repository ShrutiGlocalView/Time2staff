import {
    createStackNavigator
} from 'react-navigation';
import BillingInfo from '../Screens/BillingInfo';
import ProfessionalInfo from '../Screens/ProfessionalInfo';
import PersonalInfo from '../Screens/PersonalInfo';
import StepIndicatorTest from '../Screens/StepIndicatorTest';

var CompleteProfileNavigator = createStackNavigator({
    // personalInfo: PersonalInfo,
    personalInfo: StepIndicatorTest,
    billingInfo: BillingInfo,
    professionalInfo: ProfessionalInfo,
},{
    headerMode: 'none'
});

export default CompleteProfileNavigator;