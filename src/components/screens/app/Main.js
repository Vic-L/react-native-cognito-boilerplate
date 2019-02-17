import React from 'react';
import {
  Alert,
  Text,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import styled from 'styled-components';

import Button from '../../elements/Button';

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
    };

    this.onLogout = this.onLogout.bind(this);
    this.onTabs = this.onTabs.bind(this);
    this.onDrawer = this.onDrawer.bind(this);
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    this.setState({
      username: user.username,
    });
  }

  onTabs() {
    const { navigation } = this.props;
    navigation.navigate('BottomTabNavigator');
  }

  onDrawer() {
    const { navigation } = this.props;
    navigation.navigate('DrawerNavigator');
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
    const { username } = this.state;
    return (
      <Wrapper>
        <Text>{username}</Text>
        <Button
          text="LOGOUT"
          onPress={this.onLogout}
        />
        <Button
          text="BottomTabNavigator"
          onPress={this.onTabs}
        />
        <Button
          text="DrawerNavigator"
          onPress={this.onDrawer}
        />
      </Wrapper>
    );
  }
}

export default Main;
