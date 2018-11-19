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
    const optionalConfigObject = {
      title: "Authentication Required", // Android
      imageColor: "#e00606", // Android
      imageErrorColor: "#ff0000", // Android
      sensorDescription: "Touch sensor", // Android
      sensorErrorDescription: "Failed", // Android
      cancelText: "Cancel", // Android
      fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // iOS
    }
    try {
      const shouldSetupTouchID = await AsyncStorage.getItem('SETUP_TOUCH_ID')
      // shouldSetupTouchID === false if user cancel setup the first time
      // shouldSetupTouchID === null if first time login n set up per device
      // shouldSetupTouchID === true if user login before and setup touch id
      if (shouldSetupTouchID) {
        // do nothing
      } else {
        await TouchID.authenticate('to demo this react-native component', optionalConfigObject)

        await AsyncStorage.setItem('SETUP_TOUCH_ID', JSON.stringify(true))

        Alert.alert(
          'Alert',
          'Authenticated Successfully',
          [{text: 'OK'}],
          { cancelable: false }
        )
      }
    } catch (err) {
      // handle TouchID errors
      if (err.name === 'TouchIDError') {
        switch(err.code) {
          case 'USER_CANCELED':
            await AsyncStorage.setItem('SETUP_TOUCH_ID', JSON.stringify(false))
            break
          default:
            Alert.alert(
              'TouchID Alert',
              err.message,
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