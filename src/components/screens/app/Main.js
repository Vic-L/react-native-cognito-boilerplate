import React from 'react'
import { View } from 'react-native'
import Auth from '@aws-amplify/auth'

import Button from '../../elements/Button'

class Main extends React.Component {
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
          text="BottomTabs"
          onPress={this.onTabs.bind(this)}/>
        <Button
          text="Drawer"
          onPress={this.onDrawer.bind(this)}/>
      </View>
    )
  }

  onTabs() {
    this.props.navigation.navigate('BottomTabs')
  }

  onDrawer() {
    this.props.navigation.navigate('DrawerStack')
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