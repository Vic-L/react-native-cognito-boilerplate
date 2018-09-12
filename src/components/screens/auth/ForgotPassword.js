import React from 'react'
import { View } from 'react-native'

import TextField from '../../elements/TextField'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: null,
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
          <TextField
            label='EMAIL'
            placeholder='Email'
            value={this.state.email}
            onChangeText={this.onChangeEmail.bind(this)}/>
        </View>
      </View>
    )
  }

  onChangeEmail(email) {
    this.setState({
      email
    })
  }
}

export default ForgotPassword