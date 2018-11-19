import _ from 'lodash'
import React from 'react'
import {
  View,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import * as Keychain from 'react-native-keychain'
import TouchID from 'react-native-touch-id'
import Auth from '@aws-amplify/auth'

import TextField from '../../elements/TextField'
import TextLink from '../../elements/TextLink'
import Button from '../../elements/Button'
import FormContainer from '../../elements/FormContainer'
import NavbarSpacing from '../../elements/NavbarSpacing'

import RequestNotificationPermission from '../../../services/RequestNotificationPermission'
import ValidateField from '../../../services/ValidateField'
import ValidateFormObject from '../../../services/ValidateFormObject'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasStoredCredentials: false,
      submittedFormBefore: false,
      email: null,
      password: null,
    }
  }

  async componentDidMount() {
    try {
      // Retreive the credentials
      const credentials = await Keychain.getGenericPassword()
      if (credentials) {
        console.log('Credentials successfully loaded for user ' + credentials.username);
        this.setState({
          hasStoredCredentials: true,
          email: credentials.username})
      } else {
        console.log('No credentials stored')
      }
    } catch (error) {
      console.log('Keychain couldn\'t be accessed!', error);
    }

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
    const { email, password, submittedFormBefore } = this.state
    return (
      <View style={{ flex: 1 }}>

        <FormContainer
          style={{ flex: 1, padding: 15 }}
          bounces={false}>
          <NavbarSpacing/>

          <TextField
            label='EMAIL'
            placeholder='Email'
            value={email}
            error={ValidateField('login-email', email, submittedFormBefore)}
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
            value={password}
            error={ValidateField('login-password', password, submittedFormBefore)}
            onChangeText={this.onChangePassword.bind(this)}
            onSubmitEditing={this.onLogin.bind(this)}/>

          <TextLink
            containerStyle={{alignSelf: 'center'}}
            text='Forgot password'
            onPress={this.onForgetPassword.bind(this)}/>

          <Button
            text="LOGIN"
            onPress={this.onLogin.bind(this)}/>

          {
            this.state.hasStoredCredentials ? (
              <Button
                text="LOGIN WITH TOUCH ID"
                onPress={this.onAuthenticateWithTouchID.bind(this)}/>
            ) : null
          }

        </FormContainer>

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
    this.setState({
      submittedFormBefore: true
    })
    if (ValidateFormObject('login', _.pick(this.state, ['email', 'password']))) {
      this.login(this.state.email, this.state.password)
    }
  }

  login(email, password) {
    this.props.dispatchLoginRequest()
    Auth.signIn(email, password)
    .then(async (user) => {
      await RequestNotificationPermission()
      this.props.dispatchLoginSuccess(email, password)
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

  async onAuthenticateWithTouchID() {
    const optionalConfigObject = {
      title: "Authentication Required", // Android
      imageColor: "#e00606", // Android
      imageErrorColor: "#ff0000", // Android
      sensorDescription: "Touch sensor", // Android
      sensorErrorDescription: "Failed", // Android
      cancelText: "Cancel", // Android
      fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // iOS
    }
    try {
      const credentials = await Keychain.getGenericPassword()
      
      if (credentials) {
        await TouchID.authenticate('to demo this react-native component', optionalConfigObject)

        this.login(credentials.username, credentials.password)
      } else {
        Alert.alert(
          'Alert',
          'No credentials stored; should not happen',
          [{text: 'OK'}],
          { cancelable: false }
        )
      }
    } catch (err) {
      Alert.alert(
        'Alert',
        err.message,
        [{text: 'OK'}],
        { cancelable: false }
      )
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoginRequest: () => {
      console.log('dispatching', 'LOGIN_REQUEST')
      dispatch({type: 'LOGIN_REQUEST'})
    },
    dispatchLoginSuccess: (email, password) => {
      console.log('dispatching', 'LOGIN_SUCCESS')
      dispatch({
        type: 'LOGIN_SUCCESS',
        email,
        password
      })
    },
    dispatchLoginFailure: () => {
      console.log('dispatching', 'LOGIN_FAILURE')
      dispatch({type: 'LOGIN_FAILURE'})
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)