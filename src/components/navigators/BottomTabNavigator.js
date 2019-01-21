import {
  createBottomTabNavigator,
} from 'react-navigation';

import Posts from '../screens/Posts';
import Forms from '../screens/Forms';

const BottomTabNavigator = createBottomTabNavigator({
    Posts: {
      screen: Posts,
      navigationOptions: {
        // tabBarIcon: TODO,
        tabBarLabel: 'My Posts'
      }
    },
    Forms: {
      screen: Forms,
    },
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    initialRouteName: 'Posts',
    order: ['Posts', 'Forms'],
    backBehavior: 'none',
    tabBarOptions: {
      activeTintColor: 'black',
      activeBackgroundColor: 'red',
      inactiveTintColor: 'white',
      inactiveBackgroundColor: 'white',
      showLabel: true,
      style: {},
      labelStyle: {
        fontSize: 12,
        color: 'blue'
      },
      tabStyle: {},
      allowFontScaling: true,
    }
  }
);

export default BottomTabNavigator;
