import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

import Startup from './screens/Startup'
import Welcome from './screens/auth/Welcome'
import Login from './screens/auth/Login'
import ForgotPassword from './screens/auth/ForgotPassword'

const AuthStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        headerTransparent: true
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerTransparent: true
      }
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        headerTransparent: true
      }
    }
  },
  {
    initialRouteName: 'Welcome',
  }
)

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
