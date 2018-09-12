import React from 'react'
import { View, Text } from 'react-native'
import TimerMixin from 'react-timer-mixin'

class Startup extends React.Component {
  componentDidMount() {
    TimerMixin.setTimeout(this.goToWelcomePage.bind(this), 1000)
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Booting</Text>
      </View>
    )
  }

  goToWelcomePage() {
    this.props.navigation.navigate('Welcome')
  }
}

export default Startup