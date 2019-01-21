import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { 
  COLOR,
} from '../../constants';

const LinkContainer = styled.TouchableOpacity`
  color: ${COLOR.PRIMARY};
  align-self: center;
  ${props => props.style}
`;

const LinkText = styled.Text`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const TextLink = ({
  text,
  onPress,
  textStyle,
  containerStyle,
}) => (
  <LinkContainer
    onPress={onPress}
    style={containerStyle}
  >
    <LinkText style={textStyle}>
      {text}
    </LinkText>
  </LinkContainer>
);

TextLink.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  
  textStyle: PropTypes.string,
  containerStyle: PropTypes.string,
};

export default TextLink;
