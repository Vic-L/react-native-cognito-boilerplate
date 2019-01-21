import React from 'react';
import { Alert } from 'react-native';
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

class ConfirmSignup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmationCode: null,
    };
  }

  onChangeConfirmationCode(confirmationCode) {
    this.setState({
      confirmationCode
    });
  }

  onLogin() {
    Auth.confirmSignUp(
      this.props.navigation.getParam('username', null), 
      this.state.confirmationCode,
      {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true
      }
    ).then((data) => {
      console.log('confirmSignUp', data);
      this.props.navigation.replace({
        key: this.props.navigation.getParam('signupScreenKey', null),
        routeName: 'Login',
        immediate: true // currently no effect
      });
      this.props.navigation.goBack();
    })
    .catch((err) => {
      console.log(err);
      Alert.alert(
        'Alert',
        err.message || err,
        [{ text: 'OK' }]
      );
    });
  }

  render() {
    return (
      <Wrapper>

        <FormWrapper>

          <TextField
            label='CONFIRMATION CODE'
            placeholder='Confirmation Code'
            keyboardType='numeric'
            value={this.state.confirmationCode}
            onChangeText={this.onChangeConfirmationCode.bind(this)}
          />

          <Button
            text="LOGIN"
            onPress={this.onLogin.bind(this)}
          />

        </FormWrapper>

      </Wrapper>
    );
  }
}

export default ConfirmSignup;
