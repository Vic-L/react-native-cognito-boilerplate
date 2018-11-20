import _ from 'lodash'
import React from 'react'
import {
  View,
  Alert,
  AsyncStorage,
} from 'react-native'
import { connect } from 'react-redux'
import * as Keychain from 'react-native-keychain'
import OpenAppSettings from 'react-native-app-settings'
import DeviceInfo from 'react-native-device-info'
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
      biometricSupported: null,
      hasStoredCredentials: false,
      submittedFormBefore: false,
      email: null,
      password: null,
    }
  }

  async componentDidMount() {
    // check if biometricSupported to determine if should show button or not
    // return null if not supported
    const biometricSupported = await Keychain.getSupportedBiometryType()
    this.setState({biometricSupported})

    // Retreive email from AsyncStorage
    try {
      const email = await AsyncStorage.getItem(`${DeviceInfo.getBundleId()}:email`)

      if (email) {
        this.setState({
          hasStoredCredentials: true,
          email
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
            this.shouldAllowLoginByBiometric() ? (
              <Button
                text="LOGIN WITH Biometric"
                onPress={this.onAuthenticateWithBiometric.bind(this)}/>
            ) : null
          }

        </FormContainer>

      </View>
    )
  }

  shouldAllowLoginByBiometric() {
    return this.state.biometricSupported && this.state.hasStoredCredentials
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

  async onAuthenticateWithBiometric() {
    try {
      const credentials = await Keychain.getGenericPassword({service: DeviceInfo.getBundleId()})
      
      if (credentials) {
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
        JSON.stringify(err),
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