import React from 'react'
import { View, Text } from 'react-native'
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js"
import uuidv4 from 'uuid/v4'
import Config from 'react-native-config'

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
    const userPool = new CognitoUserPool({
        UserPoolId: Config.COGNITO_USER_POOL_ID,
        ClientId: Config.COGNITO_CLIENT_ID
    })

    const attributeList = []
    attributeList.push(new CognitoUserAttribute({
      Name: 'given_name',
      Value: this.state.firstName
    }))
    attributeList.push(new CognitoUserAttribute({
      Name: 'family_name',
      Value: this.state.lastName
    }))
    attributeList.push(new CognitoUserAttribute({
      Name: 'email',
      Value: this.state.email
    }))

    userPool.signUp(uuidv4(), this.state.password, attributeList, null, (err,result) => {
     if (err) {
        console.log('Error at signup ', err)
        return
     }
     
     console.log('cognitoUser', result.user)
    })
  }
}

export default Signup