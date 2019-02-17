import React from 'react';
import {
  Alert,
  Text,
  ScrollView,
} from 'react-native';
import {
  DrawerItems,
} from 'react-navigation';
import Auth from '@aws-amplify/auth';
import styled from 'styled-components';

import Button from './Button';

const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

class DrawerContentComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  async onLogout() {
    const { navigation } = this.props;
    try {
      await Auth.signOut();
      navigation.navigate('Welcome');
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
    return (
      <ScrollView>
        <Wrapper forceInset={{
          top: 'always',
          horizontal: 'never',
        }}
        >
          <Text>App Title</Text>

          <DrawerItems {...this.props} />

          <Button
            text="LOGOUT"
            onPress={this.onLogout}
          />
        </Wrapper>
      </ScrollView>
    );
  }
}

export default DrawerContentComponent;
