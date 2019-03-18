import _ from 'lodash';
import React from 'react';
import {
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  COLOR,
} from '../../constants';

const FIELD_CONTAINER_HEIGHT = 60;
const FLOAT_LABEL_FONT_SIZE = 12;
const INPUT_FONT_SIZE = 16;

const Wrapper = styled.View`
  padding: 16px;
  height: ${FIELD_CONTAINER_HEIGHT};
  justify-content: center;
  background-color: #ededed;
`;

const Label = styled.Text`
  font-size: ${props => (props.value ? FLOAT_LABEL_FONT_SIZE : INPUT_FONT_SIZE)};
  color: ${(props) => {
    if (props.value) {
      return props.hasError ? COLOR.ERROR : COLOR.BLACK;
    }

    return 'transparent';
  }};
  margin-bottom: 4px;
`;

const Input = styled.TextInput`
  font-size: ${INPUT_FONT_SIZE};
  color: ${props => (props.hasError ? COLOR.ERROR : COLOR.BLACK)};
  border-width: 0;
  padding: 0;
  width: 100%;${props => props.style};

  // does not seem to work yet */
  /* selectionColor: this.props.error ? COLOR.ERROR : COLOR.FONT_BLACK
`;

// uncontrolled
class TextField extends React.Component {
  constructor(props) {
    super(props);

    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.input.focus();
  }

  render() {
    const {
      label,
      value,
      error,
      containerCss,
      inputCss,
      labelCss,
      ...props
    } = this.props;

    const hasError = !_.isNil(error) && error !== '';

    return (
      <TouchableWithoutFeedback onPress={this.focusTextInput}>
        <Wrapper css={containerCss}>
          {
            value ? (
              <Label
                css={labelCss}
                value={value}
                hasError={hasError}
              >
                {label}
              </Label>
            ) : (
              null
            )
          }
          <Input
            {...props}
            css={inputCss}
            ref={(component) => {
              this.input = component;
            }}
            placeholderTextColor={hasError ? COLOR.ERROR : 'gray'}
            value={value}
            hasError={hasError}
            underlineColorAndroid="transparent"
          />
        </Wrapper>
      </TouchableWithoutFeedback>
    );
  }
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

  value: PropTypes.string,
  error: PropTypes.string,
  containerCss: PropTypes.string,
  labelCss: PropTypes.string,
  inputCss: PropTypes.string,
};

TextField.defaultProps = {
  value: null,
  error: null,
  containerCss: null,
  labelCss: null,
  inputCss: null,
};

export default TextField;
