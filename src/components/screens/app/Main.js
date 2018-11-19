import React from 'react'
import {
  View,
  AsyncStorage,
  Alert,
} from 'react-native'
import TouchID from 'react-native-touch-id'
import Auth from '@aws-amplify/auth'

import Button from '../../elements/Button'

class Main extends React.Component {
  async componentDidMount() {
    try {
      // use non unified errors which is the default
      const touchIDSupported = await TouchID.isSupported()

      if (touchIDSupported) {
        // ask to setup touchID
      } else {
        // do nothing
        Alert.alert(
          'TouchID Not Supported Alert',
          JSON.stringify(touchIDSupported),
          [{text: 'OK'}],
          { cancelable: false }
        )
      }
    } catch (err) {
      // handle unified TouchID errors
      if (err.name === 'TouchIDError') {
        switch(err.code) {
          case 'AUTHENTICATION_FAILED':
          case 'USER_CANCELED':
          case 'SYSTEM_CANCELED':
          case 'NOT_PRESENT':
          case 'NOT_SUPPORTED':
          case 'NOT_AVAILABLE':
          case 'NOT_ENROLLED':
          case 'TIMEOUT':
          case 'LOCKOUT':
          case 'LOCKOUT_PERMANENT':
          case 'PROCESSING_ERROR':
          case 'USER_FALLBACK':
          case 'FALLBACK_NOT_ENROLLED':
          case 'UNKNOWN_ERROR':
          default:
            Alert.alert(
              'TouchID Alert',
              JSON.stringify(err),
              [{text: 'OK'}],
              { cancelable: false }
            )
        }
      // handle other errors (Async Storage errors)
      } else {
        Alert.alert(
          'Alert',
          err.message,
          [{text: 'OK'}],
          { cancelable: false }
        )
      }
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Button
          text="LOGOUT"
          onPress={this.onLogout.bind(this)}/>
        <Button
          text="BottomTabNavigator"
          onPress={this.onTabs.bind(this)}/>
        <Button
          text="DrawerNavigator"
          onPress={this.onDrawer.bind(this)}/>
      </View>
    )
  }

  onTabs() {
    this.props.navigation.navigate('BottomTabNavigator')
  }

  onDrawer() {
    this.props.navigation.navigate('DrawerNavigator')
  }

  onLogout() {
    Auth.signOut()
    .then(() => {
      this.props.navigation.navigate('Welcome')
    })
    .catch((err) => {
      console.log(err)
      Alert.alert(
        "Alert",
        err.message || err,
        [{text: "OK"}]
      )
    })
  }
}

export default Main