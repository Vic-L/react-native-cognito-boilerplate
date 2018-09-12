import React from 'react'
import { View, Text } from 'react-native'

class Welcome extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome page</Text>
      </View>
    )
  }
}

export default Welcome