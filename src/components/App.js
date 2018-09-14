import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import createSagaMiddleware from 'redux-saga'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from  'react-redux'

import rootReducers from '../reducers'

import Startup from './screens/Startup'
import Welcome from './screens/auth/Welcome'
import Login from './screens/auth/Login'
import Signup from './screens/auth/Signup'
import ForgotPassword from './screens/auth/ForgotPassword'

// middlewares
const middlewares = []

const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)
 
const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducers)

// TODO implement
// sagaMiddleware.run(sagas)

// screens
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
    },
    Signup: {
      screen: Signup,
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
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    )
  }
}
