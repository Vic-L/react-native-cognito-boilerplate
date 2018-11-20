import _ from 'lodash'
import React from 'react'
import {
  View,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import * as Keychain from 'react-native-keychain'
import TouchID from 'react-native-touch-id'
import OpenAppSettings from 'react-native-app-settings'
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
      touchIDSupported: false,
      hasStoredCredentials: false,
      submittedFormBefore: false,
      email: null,
      password: null,
    }
  }

  async componentDidMount() {
    // check if touchIDSupported to determine if should show button or not
    try {
      const optionalConfigObject = {
        unifiedErrors: true, // use unified error messages (default false)
      }
      const touchIDSupported = await TouchID.isSupported(optionalConfigObject)

      this.setState({touchIDSupported: true})
    } catch(err) {
      if (err.name === 'TouchIDError') {
        switch(err.code) {
          case 'USER_CANCELED':
          case 'SYSTEM_CANCELED':
            break
          case 'NOT_SUPPORTED':
            // library return 'NOT_SUPPORTED' for ios that did not set up touchID; will consider as not supported
          case 'AUTHENTICATION_FAILED':
          case 'NOT_PRESENT':
          case 'NOT_AVAILABLE':
          case 'NOT_ENROLLED':
          case 'TIMEOUT':
          case 'LOCKOUT':
          case 'LOCKOUT_PERMANENT':
          case 'PROCESSING_ERROR':
          case 'USER_FALLBACK':
          case 'FALLBACK_NOT_ENROLLED':
          case 'UNKNOWN_ERROR':
          default:
            this.setState({touchIDSupported: false})
        }
      } else {
        // should not happen
        Alert.alert(
          'Alert',
          err.message,
          [{text: 'OK'}],
          { cancelable: false }
        )
      }
    }

    // Retreive the credentials
    try {
      const credentials = await Keychain.getGenericPassword()
      if (credentials) {
        this.setState({
          hasStoredCredentials: true,
          email: credentials.username
        })
      }
    } catch (err) {
      // should not happen
      Alert.alert(
        'Alert',
        err.message,
        [{text: 'OK'}],
        { cancelable: false }
      )
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
            this.shouldAllowLoginByTouchID() ? (
              <Button
                text="LOGIN WITH TOUCH ID"
                onPress={this.onAuthenticateWithTouchID.bind(this)}/>
            ) : null
          }

        </FormContainer>

      </View>
    )
  }

  shouldAllowLoginByTouchID() {
    return this.state.touchIDSupported && this.state.hasStoredCredentials
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
      unifiedErrors: true, // use unified error messages (default false)
      passcodeFallback: false // iOS
    }
    try {
      const credentials = await Keychain.getGenericPassword()
      
      if (credentials) {
        await TouchID.authenticate('Optional text here', optionalConfigObject)

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
      // handle unified TouchID errors
      if (err.name === 'TouchIDError') {
        switch(err.code) {
          case 'USER_CANCELED':
          case 'SYSTEM_CANCELED':
            break
          case 'NOT_SUPPORTED':
            // library return 'NOT_SUPPORTED' for ios that did not set up touchID, so will prompt to setup
            // NOTE this code will not run on device based on current setup as during componentDidMount, the LOGIN WITH TOUCH ID button is not shown
            // This will run on simulator however as simulator return truthy for TouchId.isSupported() but falsy for TouchId.authenticate()
            Alert.alert(
              'Alert',
              "TODO You have not setup Biometric system or your phone does not support it. Setup now?",
              [
                {text: 'Not now'},
                {
                  text: 'Settings',
                  onPress: () => OpenAppSettings.open()
                },
              ],
              { cancelable: false }
            )
            break
          case 'NOT_PRESENT':
          case 'NOT_AVAILABLE':
          case 'NOT_ENROLLED':
          case 'AUTHENTICATION_FAILED':
          case 'TIMEOUT':
          case 'LOCKOUT':
          case 'LOCKOUT_PERMANENT':
          case 'PROCESSING_ERROR':
          case 'USER_FALLBACK':
          case 'FALLBACK_NOT_ENROLLED':
          case 'UNKNOWN_ERROR':
          default:
            Alert.alert(
              'TouchID Alert',
              JSON.stringify(err),
              [{text: 'OK'}],
              { cancelable: false }
            )
        }
      // handle other errors (Keychain errors)
      } else {
        Alert.alert(
          'Alert',
          JSON.stringify(err),
          [{text: 'OK'}],
          { cancelable: false }
        )
      }
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