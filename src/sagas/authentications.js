import * as Keychain from 'react-native-keychain'
import DeviceInfo from 'react-native-device-info'
import { put, call, takeLatest } from 'redux-saga/effects'
import { AsyncStorage, Alert } from 'react-native'

export default function* authenticationsSaga() {
  yield takeLatest("LOGIN_SUCCESS", saveCredentialsToKeychain)
}

function* saveCredentialsToKeychain({ email, password }) {
  try {
    // Store email only in Async Storage
    yield call([AsyncStorage, 'setItem'], `${DeviceInfo.getBundleId()}:email`, email)
    // Store the credentials in keychain
    yield call(Keychain.setGenericPassword, email, password, {
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
      service: DeviceInfo.getBundleId()
    })
    // TODO request touchId
    yield put({type: 'SAVED_CREDENTIALS_TO_KEYCHAIN'})
  } catch (err) {
    Alert.alert(
      'Alert',
      err.message,
      [{text: 'OK'}]
    )
  }
}