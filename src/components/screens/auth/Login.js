import _ from 'lodash';
import React from 'react';
import {
  Alert,
  AsyncStorage,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import DeviceInfo from 'react-native-device-info';
import Auth from '@aws-amplify/auth';
import styled from 'styled-components';

import TextField from '../../elements/TextField';
import TextLink from '../../elements/TextLink';
import ButtonWithLoader from '../../elements/ButtonWithLoader';
import FormContainer from '../../elements/FormContainer';
import NavbarSpacing from '../../elements/NavbarSpacing';

import RequestNotificationPermission from '../../../services/RequestNotificationPermission';
import ValidateField from '../../../services/ValidateField';
import ValidateFormObject from '../../../services/ValidateFormObject';
import {
  COLOR
} from '../../../constants';

const Wrapper = styled.View`
  flex: 1;
`;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      biometricSupported: null,
      biometricAssociatedEmail: null,
      submittedFormBefore: false,
      email: null,
      password: null,
    };

    this.loginButton = React.createRef();
    this.biometricButton = React.createRef();
  }

  async componentDidMount() {
    // check if biometricSupported to determine if should show button or not
    // return null if not supported
    const biometricSupported = await Keychain.getSupportedBiometryType();
    this.setState({ biometricSupported });

    // Retreive email from AsyncStorage
    try {
      const email = await AsyncStorage.getItem(`${DeviceInfo.getBundleId()}:email`);
      const biometricAssociatedEmail = await AsyncStorage.getItem(
        `${DeviceInfo.getBundleId()}:biometricAssociatedEmail`
      );


      this.setState({
        biometricAssociatedEmail,
        email
      });
    } catch (err) {
      // should not happen
      Alert.alert(
        'Alert',
        err.message,
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }

    this.props.navigation.addListener(
      'willFocus',
      (payload) => {
        if (!_.isNil(payload.state.params)) {
          this.setState({
            email: payload.state.params.email || null
          });
        }
      }
    );
  }

  onChangeEmail(email) {
    this.loginButton.current.reset();
    this.setState({
      email
    });
  }

  onChangePassword(password) {
    this.loginButton.current.reset();
    this.setState({
      password
    });
  }

  onForgetPassword() {
    this.loginButton.current.reset();
    this.props.navigation.navigate('ForgotPassword');
  }

  async onLogin() {
    this.setState({
      submittedFormBefore: true
    });
    if (ValidateFormObject('login', _.pick(this.state, ['email', 'password']))) {
      await this.login(this.state.email, this.state.password);
    } else {
      this.loginButton.current.error();
    }
  }

  async onAuthenticateWithBiometric() {
    this.biometricButton.current.load();
    try {
      const credentials = await Keychain.getGenericPassword({
        service: DeviceInfo.getBundleId()
      });
      
      if (credentials) {
        this.login(credentials.username, credentials.password);
      } else {
        this.biometricButton.current.reset();
        Alert.alert(
          'Alert',
          'No credentials stored; should not happen',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
    } catch (err) {
      this.biometricButton.current.reset();
      if (err.message !== 'User canceled the operation.') {
        Alert.alert(
          'Alert',
          JSON.stringify(err),
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
    }
  }

  shouldAllowLoginByBiometric() {
    return this.state.biometricSupported &&
      this.state.biometricAssociatedEmail &&
      this.state.biometricAssociatedEmail === this.state.email;
  }

  async login(email, password) {
    try {
      const user = await Auth.signIn(email, password);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        const newAttributes = {};
        for (const attribute of user.challengeParam.requiredAttributes) {
          // random value for required attributes
          // that were not provided if user is created from AWS console
          newAttributes[attribute] = 'qwe';
        }

        await Auth.completeNewPassword(
          user,
          password,
          newAttributes
        );
      }
      
      await RequestNotificationPermission();
      this.loginButton.current.success();
      this.props.navigation.navigate('Main');
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Alert',
        err.message || err,
        [{ text: 'OK' }]
      );
      this.loginButton.current.error();
    }
  }

  render() {
    const { email, password, submittedFormBefore } = this.state;
    return (
      <Wrapper>

        <FormContainer
          style='padding: 15px;'
          bounces={false}
        >
          <NavbarSpacing />

          <TextField
            label='EMAIL'
            placeholder='Email'
            value={email}
            error={ValidateField('login-email', email, submittedFormBefore)}
            keyboardType='email-address'
            autoCapitalize='none'
            onSubmitEditing={() => {
              this.refs.passwordField.refs.input.focus();
            }}
            autoFocus
            returnKeyType='next'
            onChangeText={this.onChangeEmail.bind(this)}
          />

          <TextField
            ref='passwordField'
            label='PASSWORD'
            placeholder='Password'
            secureTextEntry
            autoCapitalize='none'
            onSubmitEditing={this.onLogin.bind(this)}
            returnKeyType='done'
            value={password}
            error={ValidateField('login-password', password, submittedFormBefore)}
            onChangeText={this.onChangePassword.bind(this)}
            onSubmitEditing={this.onLogin.bind(this)}
          />

          <TextLink
            containerStyle={'justify-content: center;'}
            text='Forgot password'
            onPress={this.onForgetPassword.bind(this)}
          />

          <ButtonWithLoader
            backgroundColor={COLOR.ALTERNATE}
            style={{
              alignSelf: 'center',
            }}
            noBorder
            shakeOnError
            label="LOGIN"
            ref={this.loginButton}
            onPress={this.onLogin.bind(this)}
          />

          {
            this.shouldAllowLoginByBiometric() ? (
              <ButtonWithLoader
                label='LOGIN WITH Biometric'
                backgroundColor={COLOR.ALTERNATE}
                style={{
                  alignSelf: 'center',
                }}
                noBorder
                shakeOnError
                ref={this.biometricButton}
                onPress={this.onAuthenticateWithBiometric.bind(this)}
              />
            ) : null
          }

        </FormContainer>

      </Wrapper>
    );
  }
}

export default Login;
