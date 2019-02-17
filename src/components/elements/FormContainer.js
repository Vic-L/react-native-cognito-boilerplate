import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled(KeyboardAwareScrollView)`
  width: 100%;
  height: 100%;
`;

class FormContainer extends React.Component {
  componentDidUpdate() {
    const keyboardScrollView = this.keyboardAwareScrollView;
    if (keyboardScrollView) {
      keyboardScrollView.update();
    }
  }

  render() {
    const { children } = this.props;

    return (
      <Wrapper
        {...this.props}
        ref={(component) => { this.keyboardAwareScrollView = component; }}
      >

        {children}

      </Wrapper>
    );
  }
}

FormContainer.propTypes = {
  children: PropTypes.node,
};

FormContainer.defaultProps = {
  children: null,
};

export default FormContainer;
