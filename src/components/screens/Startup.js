import React from 'react';
import {
  Alert,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Auth from '@aws-amplify/auth';

class Startup extends React.Component {
  async componentDidMount() {
    const { navigation } = this.props;
    try {
      await Auth.currentAuthenticatedUser();
      navigation.navigate('Drawer');
    } catch (err) {
      if (err === 'not authenticated') {
        navigation.navigate('Welcome');
      } else {
        Alert.alert(
          'Alert',
          err.message || err,
          [{ text: 'OK' }],
        );
      }
    }
  }

  componentWillUnmount() {
    SplashScreen.hide();
  }

  render() {
    return null;
  }
}

export default Startup;
