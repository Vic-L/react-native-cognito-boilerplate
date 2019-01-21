import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

import Button from '../../elements/Button';

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

class Welcome extends React.Component {
  onLogin() {
    this.props.navigation.navigate('Login');
  }

  onSignup() {
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <Wrapper>
        <Text>Welcome page</Text>
        <Button
          text='LOGIN'
          onPress={this.onLogin.bind(this)}
        />
        <Button
          text='SIGN UP'
          onPress={this.onSignup.bind(this)}
        />
      </Wrapper>
    );
  }
}

export default Welcome;
