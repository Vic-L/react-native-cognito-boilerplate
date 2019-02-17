import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
import {
  Image,
} from 'react-native';

import Posts from '../screens/Posts';
import Products from '../screens/Products';

const StackNavigator = createStackNavigator(
  {
    Posts: {
      screen: Posts,
      defaultNavigationOptions: {
        headerTitle: 'Posts',
      },
    },
    Products: {
      screen: Products,
      defaultNavigationOptions: {
        headerTransparent: true,
        headerTitle: 'Products',
      },
    },
  },
  {
    defaultNavigationOptions: () => ({
      initialRouteName: 'Posts',
      headerMode: 'screen',
      drawerLabel: 'Posts >',
      drawerIcon: () => (
        <Image
          source={require('../../images/icons/magnifying_glass.jpg')}
        />
      ),
    }),
  },
);

export default StackNavigator;
