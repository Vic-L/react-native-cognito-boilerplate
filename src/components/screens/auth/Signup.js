import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
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
            onChangeText={this.onChangeEmail.bind(this)}/>

          <TextField
            label='PASSWORD'
            placeholder='Password'
            secureTextEntry={true}
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
    this.props.dispatchSignupRequest()
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
      this.props.dispatchSignupSuccess()
      console.log(data)
    })
    .catch((err) => {
      this.props.dispatchSignupFailure()
      Alert.alert(
        "Alert",
        err.message.replace("PreSignUp failed with error ", ""),
        [{text: "OK"}]
      )
    })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchSignupRequest: () => {
      console.log('dispatching', 'SIGNUP_REQUEST')
      dispatch({type: 'SIGNUP_REQUEST'})
    },
    dispatchSignupSuccess: () => {
      console.log('dispatching', 'SIGNUP_SUCCESS')
      dispatch({type: 'SIGNUP_SUCCESS'})
    },
    dispatchSignupFailure: () => {
      console.log('dispatching', 'SIGNUP_FAILURE')
      dispatch({type: 'SIGNUP_FAILURE'})
    }
  }
}

export default connect(null, mapDispatchToProps)(Signup)