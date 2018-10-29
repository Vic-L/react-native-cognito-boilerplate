import {
  createStackNavigator,
} from 'react-navigation'

import Welcome from '../screens/auth/Welcome'
import Login from '../screens/auth/Login'
import Signup from '../screens/auth/Signup'
import ForgotPassword from '../screens/auth/ForgotPassword'
import ConfirmSignup from '../screens/auth/ConfirmSignup'
import ForgotPasswordSubmit from '../screens/auth/ForgotPasswordSubmit'

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
    },
    ForgotPasswordSubmit: {
      screen: ForgotPasswordSubmit,
      navigationOptions: {
        headerTransparent: true
      }
    },
  },
  {
    initialRouteName: 'Welcome',
  }
)

export default AuthStack