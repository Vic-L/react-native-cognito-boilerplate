import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'

import {
  COLOR
} from '../../constants'

const Button = ({
  text,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonContainerStyle}>
      <Text style={styles.buttonTextStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = {
  buttonContainerStyle: {
    padding: 10,
    borderRadius: 2,
    backgroundColor: COLOR.PRIMARY,
  },
  buttonTextStyle: {
    color: 'white'
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default Button