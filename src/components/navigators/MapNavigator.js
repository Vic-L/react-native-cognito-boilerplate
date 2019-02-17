import {
  createStackNavigator,
} from 'react-navigation';

import MapScreen from '../screens/MapScreen';
import GetNavigationHeaderMode from '../../services/GetNavigationHeaderMode';

const MapNavigator = createStackNavigator(
  {
    MapScreen: {
      screen: MapScreen,
      navigationOptions: {
        headerTitle: 'Map Stack',
      },
    },
  },
  {
    defaultNavigationOptions: () => ({
      initialRouteName: 'MapScreen',
      headerMode: GetNavigationHeaderMode(),
    }),
  },
);

export default MapNavigator;
