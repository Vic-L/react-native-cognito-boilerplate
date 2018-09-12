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
          onPress={this.onPress.bind(this)}/>
      </View>
    )
  }

  onPress() {
    this.props.navigation.navigate('Login')
  }
}

export default Welcome