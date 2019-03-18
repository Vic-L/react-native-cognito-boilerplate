import React from 'react';
import {
  Alert,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import styled from 'styled-components';

import TextField from '../../forms/TextField';
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
    super(props);

    this.state = {
      email: null,
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onForgotPassword = this.onForgotPassword.bind(this);
  }

  onChangeEmail(email) {
    this.setState({
      email,
    });
  }

  async onForgotPassword() {
    const { email } = this.state;
    const { navigation } = this.props;

    try {
      await Auth.forgotPassword(email);

      Alert.alert(
        'Alert',
        `A verification code has been sent to your email.
        Please use it and set your new password on the next page.`,
        [{
          text: 'OK',
          onPress: () => {
            navigation.replace({
              key: navigation.state.key,
              routeName: 'ForgotPasswordSubmit',
              immediate: true, // currently no effect
              params: {
                email,
              },
            });
          },
        }],
      );
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Alert',
        err.message || err,
        [{ text: 'OK' }],
      );
    }
  }

  render() {
    const { email } = this.state;
    return (
      <Wrapper>

        <FormContainer
          css="background-color: red;"
          contentContainerStyle={{
            padding: 15,
          }}
          bounces={false}
        >
          <NavbarSpacing />

          <TextField
            label="EMAIL"
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoFocus
            returnKeyType="done"
            onSubmitEditing={this.onForgotPassword}
            onChangeText={this.onChangeEmail}
          />

          <Button
            text="Submit"
            onPress={this.onForgotPassword}
          />

        </FormContainer>

      </Wrapper>
    );
  }
}

export default ForgotPassword;
