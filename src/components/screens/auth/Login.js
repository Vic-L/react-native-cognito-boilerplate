import React from 'react'
import { View, Text } from 'react-native'

import TextField from '../../elements/TextField'
import TextLink from '../../elements/TextLink'

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <View>
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

          <TextLink
            containerStyle={{alignSelf: 'center'}}
            text='Forgot password'
            onPress={this.onForgetPassword.bind(this)}/>
        </View>

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

  onForgetPassword() {
    this.props.navigation.navigate('ForgotPassword')
  }
}

export default Login