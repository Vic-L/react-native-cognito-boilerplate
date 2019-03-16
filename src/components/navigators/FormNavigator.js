import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';

import LeftHeaderDrawer from '../elements/LeftHeaderDrawer';
import Forms from '../screens/Forms';
import GetNavigationHeaderMode from '../../services/GetNavigationHeaderMode';

const FormNavigator = createStackNavigator(
  {
    Forms: {
      screen: Forms,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Forms Stack',
        headerLeft: <LeftHeaderDrawer navigation={navigation} />,
      }),
    },
  },
  {
    defaultNavigationOptions: () => ({
      initialRouteName: 'Forms',
      headerMode: GetNavigationHeaderMode(),
    }),
  },
);

export default FormNavigator;
