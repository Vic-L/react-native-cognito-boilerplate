import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled(KeyboardAwareScrollView)`
  flex: 1;
  ${props => props.style}
`;

class FormContainer extends React.Component {
  componentDidUpdate(prevProps) {
    const keyboardScrollView = this.refs.keyboardAwareScrollView
    if (keyboardScrollView) {
      keyboardScrollView.update()
    }
  }

  render() {
    const { style, ...otherProps } = this.props
    return (
      <Wrapper
        style='padding: 15px;'
        {...otherProps}
        ref='keyboardAwareScrollView'>

        {this.props.children}

      </Wrapper>
    )
  }
}

FormContainer.propTypes = {
  style: PropTypes.string,
}

export default FormContainer