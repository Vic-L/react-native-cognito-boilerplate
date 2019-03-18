import React from 'react';
import { Alert } from 'react-native';
import Auth from '@aws-amplify/auth';
import styled from 'styled-components';

import TextField from '../../forms/TextField';
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

class ConfirmSignup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmationCode: null,
    };

    this.onChangeConfirmationCode = this.onChangeConfirmationCode.bind(this);
  }

  onChangeConfirmationCode(confirmationCode) {
    this.setState({
      confirmationCode,
    });
  }

  async onLogin() {
    const { navigation } = this.props;
    const { confirmationCode } = this.state;
    try {
      const data = await Auth.confirmSignUp(
        navigation.getParam('username', null),
        confirmationCode,
        {
          // Optional. Force user confirmation irrespective of existing alias.
          // By default set to True.
          forceAliasCreation: true,
        },
      );

      console.log('confirmSignUp', data);
      navigation.replace({
        key: navigation.getParam('signupScreenKey', null),
        routeName: 'Login',
        immediate: true, // currently no effect
      });
      navigation.goBack();
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
    const { confirmationCode } = this.state;
    return (
      <Wrapper>

        <FormWrapper>

          <TextField
            label="CONFIRMATION CODE"
            placeholder="Confirmation Code"
            keyboardType="numeric"
            value={confirmationCode}
            onChangeText={this.onChangeConfirmationCode}
          />

          <Button
            text="LOGIN"
            onPress={this.onLogin}
          />

        </FormWrapper>

      </Wrapper>
    );
  }
}

export default ConfirmSignup;
