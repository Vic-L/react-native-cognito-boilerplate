import {
  createStackNavigator,
} from 'react-navigation';

import Forms from '../screens/Forms';
import GetNavigationHeaderMode from '../../services/GetNavigationHeaderMode';

const MapNavigator = createStackNavigator(
  {
    Forms: {
      screen: Forms,
      navigationOptions: {
        headerTitle: 'Forms Stack',
      },
    },
  },
  {
    defaultNavigationOptions: () => ({
      initialRouteName: 'Forms',
      headerMode: GetNavigationHeaderMode(),
    }),
  },
);

export default MapNavigator;
