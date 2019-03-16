import React from 'react';
import {
  ScrollView,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled(KeyboardAwareScrollView)`
  width: 100%;
  height: 100%;
`;

class FormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.keyboardAwareScrollView = React.createRef();
  }

  render() {
    const {
      children,
      ...otherProps
    } = this.props;

    if (Platform.OS === 'ios') {
      return (
        <Wrapper
          {...this.props}
          ref={this.keyboardAwareScrollView}
        >
          {children}
        </Wrapper>
      );
    }

    return (
      <Wrapper
        as={ScrollView}
        ref={this.keyboardAwareScrollView}
        {...otherProps}
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
