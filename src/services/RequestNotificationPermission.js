import firebase from 'react-native-firebase'

import {
  PushNotificationIOS,
  Platform,
} from 'react-native'

export default async function RequestNotificationPermission() {
  // TODO make ios and android both sue firebase messaging
  if (Platform.OS === 'ios') {
    await PushNotificationIOS.requestPermissions() // PushNotificationIOS listener event will handle the rest
  } else {
    const fcmToken = await firebase.messaging().getToken()
    if (fcmToken) {
        return fcmToken
    } else {
        return null
    }
  }
}