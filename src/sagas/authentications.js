import _ from 'lodash'
import * as Keychain from 'react-native-keychain'
import DeviceInfo from 'react-native-device-info'
import { put, call, take, takeLatest } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { AsyncStorage, Alert } from 'react-native'

export default function* authenticationsSaga() {
  yield takeLatest("LOGIN_SUCCESS", saveCredentialsToKeychain)
}

function* saveCredentialsToKeychain({ email, password }) {
  let previousEmail = null
  try {
    previousEmail = yield call([AsyncStorage, 'getItem'], `${DeviceInfo.getBundleId()}:email`)

    // same user sign in again
    if (previousEmail === email) {
      // do nothing
    } else if (_.isNull(previousEmail)) {
      // previous email is null, so nobody sign in before
      yield call(promptBiometricSetup, email, password)
    } else {
      // different user sign in; need to remove whatever is present in keychain
      yield call([Keychain, 'resetGenericPassword'],{
        service: DeviceInfo.getBundleId()
      })

      // prompt to setup biometric
      yield call(promptBiometricSetup, email, password)
    }
  } catch (err) {
    Alert.alert(
      'Alert',
      err.message,
      [{text: 'OK'}]
    )
  }
  
  // anyway, store only email in AsyncStorage
  try {
    yield call([AsyncStorage, 'setItem'], `${DeviceInfo.getBundleId()}:email`, email)

  } catch (err) {
    Alert.alert(
      'Alert',
      err.message,
      [{text: 'OK'}]
    )
  }
}

function* promptBiometricSetup(email, password) {
  const biometricSupported = yield call(Keychain.getSupportedBiometryType)
  if (biometricSupported) {
    const channel = yield call(requestSetupBiometricPermission, biometricSupported)
    const actionToTake = yield take(channel) // block saga until there is message from channel
    if (actionToTake === 'SETUP_BIOMETRIC') {
      yield call(setupBiometric, email, password)
    }
  } else {
    console.log('Biometric not supported')
  }
}

function requestSetupBiometricPermission(biometricType) {
  return eventChannel(emitter => {
    Alert.alert(
      'Setup Biometric?',
      `For easier sign in using ${biometricType}`,
      [
        {text: 'No', onPress: () => emitter('NO_SETUP_BIOMETRIC')},
        {text: 'Yes', onPress: () => emitter('SETUP_BIOMETRIC')},
      ],
      { cancelable: false }
    )

    const unsubscribe = () => {}
    return unsubscribe
  })
}

function* setupBiometric(email, password) {
  // store the credentials in keychain
  yield call([Keychain, 'setGenericPassword'], email, password, {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    service: DeviceInfo.getBundleId()
  })
}
