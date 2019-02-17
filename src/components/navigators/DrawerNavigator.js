import {
  Dimensions,
} from 'react-native';
import {
  createDrawerNavigator,
} from 'react-navigation';

import StackNavigator from './StackNavigator';
import Products from '../screens/Products';
import DrawerContentComponent from '../elements/DrawerContentComponent';

const DrawerNavigatorConfig = {
  // - Width of the drawer or a function returning it.
  drawerWidth: Dimensions.get('window').width * 0.85,

  // - Options are left or right. Default is left position.
  drawerPosition: 'left',
  contentComponent: DrawerContentComponent,
  contentOptions: {
    // the array of routes, can be modified or overridden
    items: ['Products', 'Posts'],
    // key identifying the active route
    // activeItemKey: 'something',
    // label and icon color of the active label
    activeTintColor: 'red',
    // background color of the active label
    activeBackgroundColor: 'blue',
    // label and icon color of the inactive label
    inactiveTintColor: 'white',
    // background color of the inactive label
    inactiveBackgroundColor: 'black',
    // function to be invoked when an item is pressed
    // onItemPress(route),
    // style object for the content section
    // itemsContainerStyle,
    // style object for the single item, which can contain an Icon and/or a Label
    // itemStyle,
    // style object to overwrite Text style inside content section, when your label is a string
    // labelStyle,
    // style object to overwrite Text style of the active label,
    // when your label is a string (merged with labelStyle)
    // activeLabelStyle,
    // style object to overwrite Text style of the inactive label,
    // when your label is a string (merged with labelStyle)
    // inactiveLabelStyle,
    // style object to overwrite View icon container styles.
    // iconContainerStyle,
  },
  // - Enable native animations. Default is true.
  useNativeAnimations: true,
  // - Use the Drawer background for some color. The Default is white.
  drawerBackgroundColor: 'yellow',
};

const DrawerNavigator = createDrawerNavigator(
  {
    Posts: StackNavigator,
    Products,
  },
  {
    ...DrawerNavigatorConfig,
    initialRouteName: 'Posts',
  },
);

export default DrawerNavigator;
