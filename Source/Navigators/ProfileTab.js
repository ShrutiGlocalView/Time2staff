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

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },

      
    }),
    tabBarOptions: {
      activeTintColor: '#265b91',
      inactiveTintColor: 'white',
      showIcon:true,
      style: {
        height:60,  
        backgroundColor: '#ff6815',
      },
      labelStyle: {
        fontSize: 10,
      },

    },
  }
);
 export default ProfileTab;
//ff6815