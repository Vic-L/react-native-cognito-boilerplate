import React from 'react'
import { View, Text } from 'react-native'

import Button from '../../elements/Button'

class Welcome extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome page</Text>
        <Button
          text="LOGIN"
          onPress={this.onLogin.bind(this)}/>
        <Button
          text="SIGN UP"
          onPress={this.onSignup.bind(this)}/>
      </View>
    )
  }

  onLogin() {
    this.props.navigation.navigate('Login')
  }

  onSignup() {
    this.props.navigation.navigate('Signup')
  }
}

export default Welcome