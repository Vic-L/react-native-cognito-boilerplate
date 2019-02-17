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
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.onSignup = this.onSignup.bind(this);
  }

  onLogin() {
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  onSignup() {
    const { navigation } = this.props;
    navigation.navigate('Signup');
  }

  render() {
    return (
      <Wrapper>
        <Text>Welcome page</Text>
        <Button
          text="LOGIN"
          onPress={this.onLogin}
        />
        <Button
          text="SIGN UP"
          onPress={this.onSignup}
        />
      </Wrapper>
    );
  }
}

export default Welcome;
