import {
  PushNotificationIOS,
  Platform,
} from 'react-native';

async function importFirebase() {
  const firebase = await import('react-native-firebase');
  return firebase.default.default;
}

export default async function RequestNotificationPermission() {
  // TODO make ios and android both sue firebase messaging
  if (Platform.OS === 'ios') {
    // PushNotificationIOS listener event will handle the rest
    await PushNotificationIOS.requestPermissions();
  } else {
    const firebase = await importFirebase();
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      return fcmToken;
    }

    return null;
  }
}
