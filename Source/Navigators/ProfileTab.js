import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import CompleteLogin from '../Screens/CompleteLogin';
import BillingInfo from '../Screens/BillingInfo';
import ProfessionalInfo from '../Screens/ProfessionalInfo';
import Ionicons from 'react-native-vector-icons/Ionicons';

var ProfileTab = createMaterialTopTabNavigator(
  {
    PersonalInfo: CompleteLogin,
    BillingInfo: BillingInfo,
    ProfessionalInfo:ProfessionalInfo
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'PersonalInfo') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'BillingInfo') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        else {
          iconName = `ios-list${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={20} color={tintColor} />;
      },

      
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      showIcon:true,
      style: {
        height:60,  
        backgroundColor: '#F57F17',
      },
      labelStyle: {
        fontSize: 10,
      },
    },
  }
);
 export default ProfileTab;
//ff6815