import React from 'react'
import {
  Text,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

import { 
  COLOR,
} from '../../constants'

const TextLink = ({
  text,
  onPress,
  textStyle,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginVertical: 5,
        ...containerStyle
      }}>
      <Text style={{
        color: COLOR.PRIMARY,
        ...textStyle
      }}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

TextLink.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  
  textStyle: PropTypes.object,
  containerStyle: PropTypes.object,
}

export default TextLink