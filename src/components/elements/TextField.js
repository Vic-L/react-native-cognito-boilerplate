import _ from 'lodash'
import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native'

import { 
  COLOR,
} from '../../constants'

// uncontrolle
class TextField extends React.Component {
  render() {
    const { label, value, error, ...props } = this.props

    const hasError = !_.isNil(error) && error !== ""

    const fieldContainerHeight = 60
    const floatLabelFontSize = 12
    const floatLabelLineHeight = 18
    const inputFontSize = 16
    const inputLineHeight = 18

    const labelStyle = {
      fontSize: value ? floatLabelFontSize : inputFontSize,
      color: value ? (hasError ? COLOR.ERROR : COLOR.BLACK) : 'transparent',
      marginBottom: 4,
    }

    const inputStyle = {
      fontSize: inputFontSize,
      color: hasError ? COLOR.ERROR : COLOR.BLACK,
      borderWidth: 0,
      padding: 0,
      width: '100%',
      // selectionColor: this.props.error ? COLOR.ERROR : COLOR.FONT_BLACK // does not seem to work yet
    }

    const fieldContainerStyle = {
      padding: 16,
      height: fieldContainerHeight,
      justifyContent: 'center',
      backgroundColor: 'white',
    }

    return (
      <TouchableWithoutFeedback onPress={this.focusTextInput}>
        <View style={fieldContainerStyle}>
          {
            value ? (
              <Text style={labelStyle}>
                {label}
              </Text>
            ) : (
              null
            )
          }
          <TextInput
            {...props}
            ref='input'
            placeholderTextColor={hasError ? COLOR.ERROR : 'gray'}
            value={value}
            underlineColorAndroid='transparent'
            style={inputStyle}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  focusTextInput = () => {
    this.refs.input.focus()
  }
}

export default TextField