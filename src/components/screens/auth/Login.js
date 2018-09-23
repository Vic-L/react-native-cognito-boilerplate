import _ from 'lodash'
import React from 'react'
import {
  View,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import Auth from '@aws-amplify/auth'

import TextField from '../../elements/TextField'
import TextLink from '../../elements/TextLink'
import Button from '../../elements/Button'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: null,
      password: null,
    }
  }

  componentDidMount() {
    this.props.navigation.addListener(
      'willFocus',
      (payload) => {
        if (!_.isNil(payload.state.params)) {
          this.setState({
            email: payload.state.params.email || null
          })
        }
      }
    )
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

        <View style={{ flex: 0.8 }}>
          <TextField
            label='EMAIL'
            placeholder='Email'
            value={this.state.email}
            keyboardType='email-address'
            autoCapitalize='none'
            onSubmitEditing={() => {
              this.refs.passwordField.refs.input.focus()
            }}
            autoFocus={true}
            returnKeyType='next'
            onChangeText={this.onChangeEmail.bind(this)}/>

          <TextField
            ref='passwordField'
            label='PASSWORD'
            placeholder='Password'
            secureTextEntry={true}
            autoCapitalize='none'
            onSubmitEditing={this.onLogin.bind(this)}
            returnKeyType='done'
            value={this.state.password}
            onChangeText={this.onChangePassword.bind(this)}/>

          <TextLink
            containerStyle={{alignSelf: 'center'}}
            text='Forgot password'
            onPress={this.onForgetPassword.bind(this)}/>

          <Button
            text="LOGIN"
            onPress={this.onLogin.bind(this)}/>

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

  onLogin() {
    this.props.dispatchLoginRequest()
    Auth.signIn(this.state.email, this.state.password)
    .then((user) => {
      this.props.dispatchLoginSuccess()
      this.props.navigation.navigate('Main')
    })
    .catch((err) => {
      this.props.dispatchLoginFailure()
      console.log(err)
      Alert.alert(
        "Alert",
        err.message || err,
        [{text: "OK"}]
      )
    })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoginRequest: () => {
      console.log('dispatching', 'LOGIN_REQUEST')
      dispatch({type: 'LOGIN_REQUEST'})
    },
    dispatchLoginSuccess: () => {
      console.log('dispatching', 'LOGIN_SUCCESS')
      dispatch({type: 'LOGIN_SUCCESS'})
    },
    dispatchLoginFailure: () => {
      console.log('dispatching', 'LOGIN_FAILURE')
      dispatch({type: 'LOGIN_FAILURE'})
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)