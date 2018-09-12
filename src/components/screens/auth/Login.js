import React from 'react'
import { View, Text } from 'react-native'

import TextField from '../../elements/TextField'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: null,
      password: null,
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TextField
          label='EMAIL'
          placeholder='Email'
          value={this.state.email}
          onChangeText={this.onChangeEmail.bind(this)}/>

        <TextField
          label='PASSWORD'
          placeholder='Password'
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={this.onChangePassword.bind(this)}/>
      </View>
    )
  }

  onChangeEmail(email) {
    this.setState({
      email
    })
  }

  onChangePassword(password) {
    this.setState({
      password
    })
  }
}

export default Login