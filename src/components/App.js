import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

import Startup from './Startup'
import Welcome from './Welcome'

const AuthStack = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      headerTransparent: true
    }
  },
})

const RootStack = createSwitchNavigator(
  {
    Startup: Startup,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Startup',
  }
)

export default class App extends React.Component {
  render() {
    return <RootStack />
  }
}
