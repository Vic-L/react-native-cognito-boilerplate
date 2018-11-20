import * as Keychain from 'react-native-keychain'
import DeviceInfo from 'react-native-device-info'
import { put, call, takeLatest } from 'redux-saga/effects'

export default function* authenticationsSaga() {
  yield takeLatest("LOGIN_SUCCESS", saveCredentialsToKeychain)
}

function* saveCredentialsToKeychain({ email, password }) {
  try {
    // Store the credentials
    yield call(Keychain.setGenericPassword, email, password, {
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