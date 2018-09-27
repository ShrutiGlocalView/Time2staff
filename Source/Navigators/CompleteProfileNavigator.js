import {
    createStackNavigator
} from 'react-navigation';
import BillingInfo from '../Screens/BillingInfo';
import ProfessionalInfo from '../Screens/ProfessionalInfo';
import PersonalInfo from '../Screens/PersonalInfo';
import IndicatorComponent from '../Screens/IndicatorComponent';

var CompleteProfileNavigator = createStackNavigator({
    // personalInfo: PersonalInfo,
    personalInfo: IndicatorComponent,
    billingInfo: BillingInfo,
    professionalInfo: ProfessionalInfo,
},{
    headerMode: 'none'
});

export default CompleteProfileNavigator;