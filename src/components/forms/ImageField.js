import React from 'react';
import {
  Keyboard,
  ActionSheetIOS,
  Platform,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IMAGE_PICKER_ERROR = {
  CANCEL_IMAGE_SELECTION: 'User cancelled image selection',
  CANCEL_CAMERA: 'User cancelled image selection',
};

const Wrapper = styled.TouchableOpacity`
`;

class ImageField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingImage: false,
    };

    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    Keyboard.dismiss();

    const { title, message } = this.props;

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['Camera', 'Library', 'Cancel'], // TODO use phone language option?
        cancelButtonIndex: 2,
        title,
        message,
      }, (buttonIndex) => {
        switch (true) {
          case buttonIndex === 0:
            this.openCamera();
            break;
          case buttonIndex === 1:
            this.openGallery();
            break;
          default:
            // do nothing
        }
      });
    } else {
      Alert.alert(
        title,
        message,
        [
          { text: 'Cancel' },
          {
            text: 'Gallery',
            onPress: () => {
              this.openGallery();
            },
          },
          {
            text: 'Camera',
            onPress: () => {
              this.openCamera();
            },
          },
        ],
        { cancelable: true },
      );
    }
  }

  openCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      // TODO use phone language
      loadingLabelText: 'Processing',
    }).then((response) => {
      const { onCropped } = this.props;
      onCropped(response.data, response.path);
    }).catch((e) => {
      switch (true) {
        case e.message === IMAGE_PICKER_ERROR.CANCEL_CAMERA:
          break; // do nothing
        default:
          console.log(JSON.stringify(e));
          Alert.alert(
            'Error',
            JSON.stringify(e),
            [{ text: 'OK' }],
          );
      }
    });
  }

  openGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      // TODO use phone language
      loadingLabelText: 'Processing',
    }).then((response) => {
      const { onCropped } = this.props;
      onCropped(response.data, response.path);
    }).catch((e) => {
      switch (true) {
        case e.message === IMAGE_PICKER_ERROR.CANCEL_IMAGE_SELECTION:
          // do nothing
          break;
        default:
          console.log(JSON.stringify(e));
          Alert.alert(
            'Error',
            JSON.stringify(e),
            [{ text: 'OK' }],
          );
      }
    });
  }

  render() {
    const {
      disabled,
      children,
      ...otherProps
    } = this.props;

    return (
      <Wrapper
        onPress={this.showModal}
        disabled={disabled}
        {...otherProps}
      >
        {children()}
      </Wrapper>
    );
  }
}

ImageField.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCropped: PropTypes.func.isRequired,

  disabled: PropTypes.bool,
  children: PropTypes.node,
};

ImageField.defaultProps = {
  disabled: false,
  children: null,
};

export default ImageField;
