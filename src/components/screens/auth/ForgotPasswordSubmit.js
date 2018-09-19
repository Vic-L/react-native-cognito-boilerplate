import React from 'react'
import {
  View,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import Auth from '@aws-amplify/auth'

import TextField from '../../elements/TextField'
import Button from '../../elements/Button'

class ForgotPasswordSubmit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      verificationCode: null,
      newPassword: null,
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <View style={{flex: 0.8}}>
          <TextField
            label='VERIFICATION CODE'
            placeholder='Verification Code'
            value={this.state.verificationCode}
            onChangeText={this.onChangeVerificationCode.bind(this)}/>

          <TextField
            label='NEW PASSWORD'
            placeholder='New Password'
            value={this.state.newPassword}
            onChangeText={this.onChangeNewPassword.bind(this)}/>
          <Button
            text="Submit"
            onPress={this.onForgotPasswordSubmit.bind(this)}/>
        </View>
      </View>
    )
  }

  onChangeVerificationCode(verificationCode) {
    this.setState({
      verificationCode
    })
  }

  onChangeNewPassword(newPassword) {
    this.setState({
      newPassword
    })
  }

  onForgotPasswordSubmit() {
    this.props.dispatchForgotPasswordSubmitRequest()
    Auth.forgotPasswordSubmit(
      this.props.navigation.getParam('email', null),
      this.state.verificationCode,
      this.state.newPassword,
    )
    .then(() => {
      this.props.dispatchForgotPasswordSubmitSuccess()
      Alert.alert(
        "Alert",
        "Password successfully updated.",
        [{
          text: "OK",
          onPress: () => {
            this.props.navigation.navigate('Login', 
            {
              email: this.props.navigation.getParam('email', null)
            })
          }
        }]
      )
    })
    .catch((err) => {
      console.log(err)
      this.props.dispatchForgotPasswordSubmitFailure()
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
    dispatchForgotPasswordSubmitRequest: () => {
      console.log('dispatching', 'FORGOT_PASSWORD_SUBMIT_REQUEST')
      dispatch({type: 'FORGOT_PASSWORD_SUBMIT_REQUEST'})
    },
    dispatchForgotPasswordSubmitSuccess: () => {
      console.log('dispatching', 'FORGOT_PASSWORD_SUBMIT_SUCCESS')
      dispatch({type: 'FORGOT_PASSWORD_SUBMIT_SUCCESS'})
    },
    dispatchForgotPasswordSubmitFailure: () => {
      console.log('dispatching', 'FORGOT_PASSWORD_SUBMIT_FAILURE')
      dispatch({type: 'FORGOT_PASSWORD_SUBMIT_FAILURE'})
    }
  }
}

export default connect(null, mapDispatchToProps)(ForgotPasswordSubmit)