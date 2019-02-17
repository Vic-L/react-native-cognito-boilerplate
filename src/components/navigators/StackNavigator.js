import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
import {
  Image,
} from 'react-native';

import Posts from '../screens/Posts';
import Products from '../screens/Products';
import GetNavigationHeaderMode from '../../services/GetNavigationHeaderMode';

const StackNavigator = createStackNavigator(
  {
    Posts: {
      screen: Posts,
      defaultNavigationOptions: {
        headerTitle: 'StackNav Posts Header',
      },
    },
    Products: {
      screen: Products,
      defaultNavigationOptions: {
        headerTransparent: true,
        headerTitle: 'StackNav Products Header',
      },
    },
  },
  {
    defaultNavigationOptions: () => ({
      initialRouteName: 'Posts',
      headerMode: GetNavigationHeaderMode(),
      drawerLabel: 'Posts >',
      drawerIcon: () => (
        <Image source={require('../../images/icons/magnifying_glass.jpg')} />
      ),
    }),
  },
);

export default StackNavigator;
