/*
  This component is used for overlaying fields that cannot be interaced with
  eg DateField, ImageField
*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.View`
  position: relative;
`;

const Overlay = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const NoTouchFieldWrapper = ({
  onPress,
  disabled,
  children,
}) => (
  <Wrapper>
    {children()}
    <Overlay
      onPress={onPress}
      disabled={disabled}
    />
  </Wrapper>
);

NoTouchFieldWrapper.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

NoTouchFieldWrapper.defaultProps = {
  disabled: false,
};

export default NoTouchFieldWrapper;
