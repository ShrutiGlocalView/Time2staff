import {
    createStackNavigator
} from 'react-navigation';
import BillingInfo from '../Screens/BillingInfo';
import ProfessionalInfo from '../Screens/ProfessionalInfo';
import PersonalInfo from '../Screens/PersonalInfo';

var CompleteProfileNavigator = createStackNavigator({
    personalInfo: PersonalInfo,
    billingInfo: BillingInfo,
    professionalInfo: ProfessionalInfo,
},{
    headerMode: 'none'
});

export default CompleteProfileNavigator;