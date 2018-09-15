import React from 'react'
import {
  View,
  Text,
  Alert,
} from 'react-native'
import Auth from '@aws-amplify/auth'

class Startup extends React.Component {
  componentDidMount() {
    Auth.currentAuthenticatedUser()
    .then(data => {
      console.log('currentAuthenticatedUser', data)
    })
    .catch((err) => {
      if (err === "not authenticated") {
        this.props.navigation.navigate('Welcome')
      } else {
        Alert.alert(
          "Alert",
          err.message || err,
          [{text: "OK"}]
        )
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Booting</Text>
      </View>
    )
  }
}

export default Startup