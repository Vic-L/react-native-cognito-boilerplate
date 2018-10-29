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

import DrawerContentComponent from '../elements/DrawerContentComponent'

const DrawerNavigatorConfig = {
  drawerWidth: Dimensions.get('window').width * 0.85, // - Width of the drawer or a function returning it.
  drawerPosition: 'left', // - Options are left or right. Default is left position.
  contentComponent: DrawerContentComponent,
  contentOptions: {
    items: ['Products', 'Posts'], // the array of routes, can be modified or overridden
    // activeItemKey, // key identifying the active route
    activeTintColor: 'red', // label and icon color of the active label
    activeBackgroundColor: 'blue', // background color of the active label
    inactiveTintColor: 'white', // label and icon color of the inactive label
    inactiveBackgroundColor: 'black', // background color of the inactive label
    // onItemPress(route), // function to be invoked when an item is pressed
    // itemsContainerStyle, // style object for the content section
    // itemStyle, // style object for the single item, which can contain an Icon and/or a Label
    // labelStyle, // style object to overwrite Text style inside content section, when your label is a string
    // activeLabelStyle, // style object to overwrite Text style of the active label, when your label is a string (merged with labelStyle)
    // inactiveLabelStyle, // style object to overwrite Text style of the inactive label, when your label is a string (merged with labelStyle)
    // iconContainerStyle, // style object to overwrite View icon container styles.
  },
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