import React from 'react';
import {
  Alert,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import styled from 'styled-components';

import TextField from '../../elements/TextField';
import Button from '../../elements/Button';
import FormContainer from '../../elements/FormContainer';
import NavbarSpacing from '../../elements/NavbarSpacing';

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: null,
    }
  }

  render() {
    return (
      <Wrapper>

        <FormContainer bounces={false}>
          <NavbarSpacing/>

          <TextField
            label='EMAIL'
            placeholder='Email'
            value={this.state.email}
            keyboardType='email-address'
            autoCapitalize='none'
            autoFocus={true}
            returnKeyType='done'
            onSubmitEditing={this.onForgotPassword.bind(this)}
            onChangeText={this.onChangeEmail.bind(this)}/>

          <Button
            text="Submit"
            onPress={this.onForgotPassword.bind(this)}/>

        </FormContainer>

      </Wrapper>
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

export default ForgotPassword;
