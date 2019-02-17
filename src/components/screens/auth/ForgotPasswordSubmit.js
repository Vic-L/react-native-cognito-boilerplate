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
    super(props);

    this.state = {
      verificationCode: null,
      newPassword: null,
    };

    this.onChangeVerificationCode = this.onChangeVerificationCode.bind(this);
    this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
    this.onForgotPasswordSubmit = this.onForgotPasswordSubmit.bind(this);
  }

  onChangeVerificationCode(verificationCode) {
    this.setState({
      verificationCode,
    });
  }

  onChangeNewPassword(newPassword) {
    this.setState({
      newPassword,
    });
  }

  async onForgotPasswordSubmit() {
    const { navigation } = this.props;
    const {
      verificationCode,
      newPassword,
    } = this.state;

    try {
      await Auth.forgotPasswordSubmit(
        navigation.getParam('email', null),
        verificationCode,
        newPassword,
      );

      Alert.alert(
        'Alert',
        'Password successfully updated.',
        [{
          text: 'OK',
          onPress: () => {
            navigation.navigate(
              'Login',
              {
                email: navigation.getParam('email', null),
              },
            );
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
    const {
      verificationCode,
      newPassword,
    } = this.state;

    return (
      <Wrapper>

        <FormWrapper>
          <TextField
            label="VERIFICATION CODE"
            placeholder="Verification Code"
            value={verificationCode}
            keyboardType="numeric"
            autoCapitalize="none"
            onChangeText={this.onChangeVerificationCode}
          />

          <TextField
            label="NEW PASSWORD"
            placeholder="New Password"
            secureTextEntry
            autoCapitalize="none"
            value={newPassword}
            onChangeText={this.onChangeNewPassword}
          />
          <Button
            text="Submit"
            onPress={this.onForgotPasswordSubmit}
          />
        </FormWrapper>

      </Wrapper>
    );
  }
}

export default ForgotPasswordSubmit;
