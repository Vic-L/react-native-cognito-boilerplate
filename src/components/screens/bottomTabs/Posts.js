import React from 'react'
import {
  View,
  Text,
} from 'react-native'

class Posts extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>Posts</Text>
      </View>
    )
  }
}

export default Posts