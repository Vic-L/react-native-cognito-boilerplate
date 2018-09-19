import React from 'react'
import {
  View,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import Auth from '@aws-amplify/auth'

import TextField from '../../elements/TextField'
import Button from '../../elements/Button'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: null,
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <View style={{flex: 0.8}}>
          <TextField
            label='EMAIL'
            placeholder='Email'
            value={this.state.email}
            onSumbitEditing={this.onForgotPassword.bind(this)}
            onChangeText={this.onChangeEmail.bind(this)}/>
          <Button
            text="Submit"
            onPress={this.onForgotPassword.bind(this)}/>
        </View>
      </View>
    )
  }

  onChangeEmail(email) {
    this.setState({
      email
    })
  }

  onForgotPassword() {
    Auth.forgotPassword(this.state.email)
    .then((data) => {
      console.log(data)
      Alert.alert(
        "Alert",
        "A verification code has been sent to your email. Please use it and set your new password on the next page.",
        [{
          text: "OK",
          onPress: () => {
            this.props.navigation.replace({
              key: this.props.navigation.state.key,
              routeName: 'ForgotPasswordSubmit',
              immediate: true, // currently no effect
              params: {
                email: this.state.email
              }
            })
          }
        }]
      )
    })
    .catch((err) => {
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
    dispatchForgotPasswordRequest: () => {
      console.log('dispatching', 'FORGOT_PASSWORD_REQUEST')
      dispatch({type: 'FORGOT_PASSWORD_REQUEST'})
    },
    dispatchForgotPasswordSuccess: () => {
      console.log('dispatching', 'FORGOT_PASSWORD_SUCCESS')
      dispatch({type: 'FORGOT_PASSWORD_SUCCESS'})
    },
    dispatchForgotPasswordFailure: () => {
      console.log('dispatching', 'FORGOT_PASSWORD_FAILURE')
      dispatch({type: 'FORGOT_PASSWORD_FAILURE'})
    }
  }
}

export default connect(null, mapDispatchToProps)(ForgotPassword)