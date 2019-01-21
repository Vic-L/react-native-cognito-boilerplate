import React from 'react'
import {
  View,
  Alert
} from 'react-native'
import uuidv4 from 'uuid/v4'
import Auth from '@aws-amplify/auth'

import TextField from '../../elements/TextField'
import Button from '../../elements/Button'

class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: null,
      password: null,
      firstName: null,
      lastName: null,
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

        <View style={{ flex: 0.8 }}>
          <TextField
            label='FIRST NAME'
            placeholder='First Name'
            value={this.state.firstName}
            onChangeText={this.onChangeFirstName.bind(this)}/>

          <TextField
            label='LAST NAME'
            placeholder='Last Name'
            value={this.state.lastName}
            onChangeText={this.onChangeLastName.bind(this)}/>

          <TextField
            label='EMAIL'
            placeholder='Email'
            value={this.state.email}
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={this.onChangeEmail.bind(this)}/>

          <TextField
            label='PASSWORD'
            placeholder='Password'
            secureTextEntry={true}
            autoCapitalize='none'
            value={this.state.password}
            onChangeText={this.onChangePassword.bind(this)}/>

          <Button
            text="SIGN UP"
            onPress={this.onSignup.bind(this)}/>

        </View>

      </View>
    )
  }

  onChangeFirstName(firstName) {
    this.setState({
      firstName
    })
  }

  onChangeLastName(lastName) {
    this.setState({
      lastName
    })
  }

  onChangeEmail(email) {
    this.setState({
      email
    })
  }

  onChangePassword(password) {
    this.setState({
      password
    })
  }

  onSignup() {
    Auth.signUp({
      username: uuidv4(),
      password: this.state.password,
      attributes: {
          email: this.state.email,
          given_name: this.state.firstName,
          family_name: this.state.lastName,
      },
      validationData: []  //optional
    })
    .then((data) => {
      console.log('onSignup', data)
      this.props.navigation.navigate('ConfirmSignup', { username: data.user.username,
        signupScreenKey: this.props.navigation.state.key
      })
    })
    .catch((err) => {
      Alert.alert(
        "Alert",
        err.message.replace("PreSignUp failed with error ", ""),
        [{text: "OK"}]
      )
    })
  }
}

export default Signup;
