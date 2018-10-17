import {
    createStackNavigator
} from 'react-navigation';


import Profile from '../Screens/Profile';
import privacyPolicyScreen from '../Screens/PrivacyPolicyScreen';
import ThankyouScreen from '../Screens/ThankYouScreen';
import HomeStack from './HomeStack';

var ProfileNavigator = createStackNavigator({
    profile:Profile,
    thankyouScreen: ThankyouScreen,
    homeStack: HomeStack
},{
    headerMode: 'none'
});

export default ProfileNavigator;