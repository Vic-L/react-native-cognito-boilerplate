import React from 'react';
import {
  Alert,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import styled from 'styled-components';

import TextField from '../../elements/TextField';
import Button from '../../elements/Button';

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const FormWrapper = styled.View`
  flex: 0.8;
`;

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
      <Wrapper>

        <FormWrapper>
          <TextField
            label='VERIFICATION CODE'
            placeholder='Verification Code'
            value={this.state.verificationCode}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={this.onChangeVerificationCode.bind(this)}/>

          <TextField
            label='NEW PASSWORD'
            placeholder='New Password'
            secureTextEntry={true}
            autoCapitalize='none'
            value={this.state.newPassword}
            onChangeText={this.onChangeNewPassword.bind(this)}/>
          <Button
            text="Submit"
            onPress={this.onForgotPasswordSubmit.bind(this)}/>
        </FormWrapper>
      
      </Wrapper>
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
    Auth.forgotPasswordSubmit(
      this.props.navigation.getParam('email', null),
      this.state.verificationCode,
      this.state.newPassword,
    )
    .then(() => {
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
      Alert.alert(
        "Alert",
        err.message || err,
        [{text: "OK"}]
      )
    })
  }
}

export default ForgotPasswordSubmit;
