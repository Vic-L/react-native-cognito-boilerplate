import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  COLOR,
} from '../../constants';

const ButtonContainer = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 2px;
  background-color: ${COLOR.PRIMARY};
`;

const ButtonText = styled.Text`
  color: white;
  font-family: 'Karla-Regular';
`;

const Button = ({
  text,
  onPress,
}) => (
  <ButtonContainer onPress={onPress}>
    <ButtonText>
      {text}
    </ButtonText>
  </ButtonContainer>
);


Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;
