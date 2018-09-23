import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class FormContainer extends React.Component {
  componentDidUpdate(prevProps) {
    const keyboardScrollView = this.refs.keyboardAwareScrollView
    if (keyboardScrollView) {
      keyboardScrollView.update()
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView
        {...this.props}
        ref='keyboardAwareScrollView'>

        {this.props.children}

      </KeyboardAwareScrollView>
    )
  }
}

export default FormContainer