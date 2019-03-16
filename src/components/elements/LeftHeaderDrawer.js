import React from 'react';
import {
  Image,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';

import NavBarItemWrapper from './NavBarItemWrapper';

const LeftHeaderDrawer = ({
  navigation,
}) => (
  <NavBarItemWrapper
    onPress={() => {
      Keyboard.dismiss();
      navigation.openDrawer();
    }}
  >
    <Image
      source={require('../../images/icons/magnifying_glass.jpg')}
    />
  </NavBarItemWrapper>
);

LeftHeaderDrawer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LeftHeaderDrawer;
