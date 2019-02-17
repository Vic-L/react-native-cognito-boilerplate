import {
  createSwitchNavigator,
} from 'react-navigation';

import Startup from '../screens/Startup';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const RootStackNavigator = createSwitchNavigator(
  {
    Startup,
    Auth: AuthNavigator,
    BottomTabNavigator: {
      screen: BottomTabNavigator,
      path: 'bottomTab/:param'
    },
    Drawer: DrawerNavigator,
  },
  {
    initialRouteName: 'Startup',
  }
);

export default RootStackNavigator;
