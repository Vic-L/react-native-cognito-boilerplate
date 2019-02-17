import React from 'react';
import {
  PushNotificationIOS,
  Alert,
} from 'react-native';

class IOSPushNotificationListener extends React.Component {
  componentDidMount() {
    PushNotificationIOS.addEventListener('register', (token) => {
      // TODO call api to update device
      console.log('pushnotification token:', token);
    });
    PushNotificationIOS.addEventListener('notification', (notification) => {
      Alert.alert(
        'Notification',
        JSON.stringify(notification),
        [{ text: 'OK' }],
      );
    });
    PushNotificationIOS.addEventListener('registrationError', ({
      message,
      code,
      details,
    }) => {
      console.log(JSON.stringify(details));
      Alert.alert(
        'Token registration error',
        `message: ${message}\ncode: ${code}\ndetails: ${JSON.stringify(details)}`,
        [{ text: 'OK' }],
        { cancelable: false },
      );
    });
  }

  render() {
    return null;
  }
}

export default IOSPushNotificationListener;
