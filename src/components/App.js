import React from 'react'
import { View } from 'react-native'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import createSagaMiddleware from 'redux-saga'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from  'react-redux'

import rootReducers from '../reducers'

// components
import Startup from './screens/Startup'
import Loader from './screens/Loader'
import Welcome from './screens/auth/Welcome'
import Login from './screens/auth/Login'
import Signup from './screens/auth/Signup'
import ForgotPassword from './screens/auth/ForgotPassword'
import ConfirmSignup from './screens/auth/ConfirmSignup'

// cognito
import Config from 'react-native-config'
import Auth from '@aws-amplify/auth'

Auth.configure({
  // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
  // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
  
  // REQUIRED - Amazon Cognito Region
  region: Config.COGNITO_AWS_REGION,

  // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
  // Required only if it's different from Amazon Cognito Region
  // identityPoolRegion: 'XX-XXXX-X',

  // OPTIONAL - Amazon Cognito User Pool ID
  userPoolId: Config.COGNITO_USER_POOL_ID,

  // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  userPoolWebClientId: Config.COGNITO_CLIENT_ID,

  // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
  mandatorySignIn: false,

  // // OPTIONAL - Configuration for cookie storage
  // cookieStorage: {
  // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
  //     domain: '.yourdomain.com',
  // // OPTIONAL - Cookie path
  //     path: '/',
  // // OPTIONAL - Cookie expiration in days
  //     expires: 1,
  // // OPTIONAL - Cookie secure flag
  //     secure: true
  // },

  // OPTIONAL - customized storage object
  // storage: new MyStorage(),
  
  // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
  // authenticationFlowType: 'USER_PASSWORD_AUTH'
})

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
    },
    ConfirmSignup: {
      screen: ConfirmSignup,
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
        <View style={{flex: 1}}>
          <Loader/>
          <RootStack/>
        </View>
      </Provider>
    )
  }
}
