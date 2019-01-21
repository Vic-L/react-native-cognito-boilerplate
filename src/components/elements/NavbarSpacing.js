import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from 'styled-components';

import GetNavbarHeight from '../../services/GetNavbarHeight';

const Wrapper = styled.View`
  height: ${getStatusBarHeight() + GetNavbarHeight()};
  background-color: transparent;
`;

const NavbarSpacing = () => <Wrapper />;

export default NavbarSpacing;
