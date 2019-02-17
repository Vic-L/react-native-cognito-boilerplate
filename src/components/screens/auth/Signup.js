import React from 'react';
import {
  Alert,
} from 'react-native';
import uuidv4 from 'uuid/v4';
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

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      firstName: null,
      lastName: null,
    };

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSignup = this.onSignup.bind(this);
  }

  onChangeFirstName(firstName) {
    this.setState({
      firstName,
    });
  }

  onChangeLastName(lastName) {
    this.setState({
      lastName,
    });
  }

  onChangeEmail(email) {
    this.setState({
      email,
    });
  }

  onChangePassword(password) {
    this.setState({
      password,
    });
  }

  async onSignup() {
    const {
      password,
      email,
      firstName,
      lastName,
    } = this.state;

    const { navigation } = this.props;

    try {
      const data = await Auth.signUp({
        username: uuidv4(),
        password,
        attributes: {
          email,
          firstName,
          lastName,
        },
        validationData: [], // optional
      });

      console.log('onSignup', data);
      navigation.navigate('ConfirmSignup', {
        username: data.user.username,
        signupScreenKey: navigation.state.key,
      });
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Alert',
        err.message.replace('PreSignUp failed with error ', ''),
        [{ text: 'OK' }],
      );
    }
  }

  render() {
    const {
      password,
      email,
      firstName,
      lastName,
    } = this.state;

    return (
      <Wrapper>

        <FormWrapper>
          <TextField
            label="FIRST NAME"
            placeholder="First Name"
            value={firstName}
            onChangeText={this.onChangeFirstName}
          />

          <TextField
            label="LAST NAME"
            placeholder="Last Name"
            value={lastName}
            onChangeText={this.onChangeLastName}
          />

          <TextField
            label="EMAIL"
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={this.onChangeEmail}
          />

          <TextField
            label="PASSWORD"
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={this.onChangePassword}
          />

          <Button
            text="SIGN UP"
            onPress={this.onSignup}
          />

        </FormWrapper>

      </Wrapper>
    );
  }
}

export default Signup;
