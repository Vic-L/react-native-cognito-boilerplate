import React from 'react'
import { View, Alert } from 'react-native'
import { StackActions } from 'react-navigation'
import Auth from '@aws-amplify/auth'

import TextField from '../../elements/TextField'
import Button from '../../elements/Button'

class ConfirmSignup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      confirmationCode: null,
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

        <View style={{ flex: 0.8 }}>
          <TextField
            label='CONFIRMATION CODE'
            placeholder='Confirmation Code'
            keyboardType='numeric'
            value={this.state.confirmationCode}
            onChangeText={this.onChangeConfirmationCode.bind(this)}/>

          <Button
            text="LOGIN"
            onPress={this.onLogin.bind(this)}/>

        </View>

      </View>
    )
  }

  onChangeConfirmationCode(confirmationCode) {
    this.setState({
      confirmationCode
    })
  }

  onLogin() {
    Auth.confirmSignUp(this.props.navigation.getParam('username', null), this.state.confirmationCode, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true    
    }).then((data) => {
      console.log('confirmSignUp', data)
      this.props.navigation.replace({
        key: this.props.navigation.getParam('signupScreenKey', null),
        routeName: 'Login',
        immediate: true // currently no effect
      })
      this.props.navigation.goBack()
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

export default ConfirmSignup;
