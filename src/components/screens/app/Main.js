import React from 'react'
import { View, Text } from 'react-native'

class Main extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        ailgnItems: 'center',
      }}>
        <Text>
        Main Page
        </Text>
      </View>
    )
  }
}

export default Main