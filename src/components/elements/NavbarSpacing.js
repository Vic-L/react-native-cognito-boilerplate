import React from 'react'
import { View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import GetNavbarHeight from '../../services/GetNavbarHeight'

const NavbarSpacing = () => {
  return (
    <View style={{
      height: getStatusBarHeight() + GetNavbarHeight(),
      backgroundColor: 'transparent'
    }}/>
  )
}

export default NavbarSpacing
