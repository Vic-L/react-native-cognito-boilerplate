import React from 'react'
import {
  View,
  Text,
} from 'react-native'

class Products extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>Products</Text>
      </View>
    )
  }
}

export default Products