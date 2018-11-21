import React from 'react'
import {
  View,
  Alert,
  Text,
} from 'react-native'
import Auth from '@aws-amplify/auth'

import Button from '../../elements/Button'

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null
    }
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser()
    this.setState({
      username: user.username
    })
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>{this.state.username}</Text>
        <Button
          text="LOGOUT"
          onPress={this.onLogout.bind(this)}/>
        <Button
          text="BottomTabNavigator"
          onPress={this.onTabs.bind(this)}/>
        <Button
          text="DrawerNavigator"
          onPress={this.onDrawer.bind(this)}/>
      </View>
    )
  }

  onTabs() {
    this.props.navigation.navigate('BottomTabNavigator')
  }

  onDrawer() {
    this.props.navigation.navigate('DrawerNavigator')
  }

  onLogout() {
    Auth.signOut()
    .then(() => {
      this.props.navigation.navigate('Welcome')
    })
    .catch((err) => {
      console.log(err)
      Alert.alert(
        "Alert",
        err.message || err,
        [{text: "OK"}]
      )
    })
  }
}

export default Main