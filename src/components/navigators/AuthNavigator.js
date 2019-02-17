import {
  createStackNavigator,
} from 'react-navigation';

import Welcome from '../screens/auth/Welcome';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ConfirmSignup from '../screens/auth/ConfirmSignup';
import ForgotPasswordSubmit from '../screens/auth/ForgotPasswordSubmit';

const AuthNavigator = createStackNavigator(
  {
    Welcome,
    Login,
    ForgotPassword,
    Signup,
    ConfirmSignup,
    ForgotPasswordSubmit,
  },
  {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
      headerTransparent: true,
    },
  },
);

export default AuthNavigator;
