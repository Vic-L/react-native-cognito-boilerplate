import React from 'react'
import {
  Image,
  Dimensions,
} from 'react-native'
import {
  createDrawerNavigator,
} from 'react-navigation'

import StackNavigator from './StackNavigator'

import Products from '../screens/Products'

const DrawerNavigatorConfig = {
  drawerWidth: Dimensions.get('window').width * 0.85, // - Width of the drawer or a function returning it.
  drawerPosition: 'left', // - Options are left or right. Default is left position.
  // contentComponent, // - Component used to render the content of the drawer, for example, navigation items. Receives the navigation prop for the drawer. Defaults to DrawerItems. For more information, see below.
  // contentOptions, // - Configure the drawer content, see below.
  useNativeAnimations: true, // - Enable native animations. Default is true.
  drawerBackgroundColor: 'yellow' // - Use the Drawer background for some color. The Default is white.
}

const DrawerNavigator = createDrawerNavigator(
  {
    Posts: StackNavigator,
    Products,
  },
  {
    ...DrawerNavigatorConfig,
    initialRouteName: 'Posts'
  }
)

export default DrawerNavigator