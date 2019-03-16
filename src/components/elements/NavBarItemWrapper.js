import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.TouchableOpacity`
  padding-right: 16px;
  padding-left: 16px;
  height: 100%;
  justify-content: center;
`;

const NavBarItemWrapper = ({
  onPress,
  children,
}) => (
  <Wrapper onPress={onPress}>
    {children}
  </Wrapper>
);

NavBarItemWrapper.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node,
};

NavBarItemWrapper.defaultProps = {
  children: null,
};

export default NavBarItemWrapper;
