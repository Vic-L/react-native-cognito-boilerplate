import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';

const Wrapper = styled(KeyboardAwareScrollView)`
  width: 100%;
  height: 100%;
`;

class FormContainer extends React.Component {
  componentDidUpdate() {
    const keyboardScrollView = this.refs.keyboardAwareScrollView;
    if (keyboardScrollView) {
      keyboardScrollView.update();
    }
  }

  render() {
    return (
      <Wrapper
        {...this.props}
        ref='keyboardAwareScrollView'
      >

        {this.props.children}

      </Wrapper>
    );
  }
}

export default FormContainer;
