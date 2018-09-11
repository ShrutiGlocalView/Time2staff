import React from 'react';
import {createStackNavigator} from 'react-navigation';
import ProfessionalInfo from '../Screens/ProfessionalInfo';  
import AddSkills from '../Screens/AddSkills';

const  ProfessionalInfoTab = createStackNavigator({
        ProfessionalInfo: {screen: ProfessionalInfo},
        AddSkills: {screen: AddSkills},
    },{
        headerMode:'none',
        initialRouteName:'ProfessionalInfo'
    });

  export default ProfessionalInfoTab;