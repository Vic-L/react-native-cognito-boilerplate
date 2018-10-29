import _ from 'lodash'
import React from 'react'
import {
  View,
  Image,
  Text,
} from 'react-native'

import ImageField from '../forms/ImageField'

class Forms extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageBase64: null,
      initialImagePath: ["https://store.donanimhaber.com/ae/0c/c4/ae0cc4f398e19a24a9b0434dcec0c365.png", null][Math.floor(Math.random() * 2)],
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>Forms</Text>
        <ImageField
          initialImagePath={this.state.initialImagePath}
          title='Add image'
          message='Description of what this image is for'
          onCropped={(imageBase64) => {
            this.setState({imageBase64})
          }}
          render={({ imagePath }) => {
            let image = null
            if (_.isNil(imagePath)) {
              image = <Image source={require('../../images/icons/magnifying_glass.jpg')}/>
            } else {
              debugger
              image = <Image 
                style={{
                  width: 150,
                  height: 150,
                }}
                source={{uri: imagePath}}/>
            }
            return (
              <View>
                {image}
              </View>
            )
          }}/>
      </View>
    )
  }
}

export default Forms