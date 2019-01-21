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
  ${props => props.style}
`;

class ImageField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageBase64: null,
      imagePath: props.initialImagePath, // for initial image eg during edit
      isModalVisible: false,
      isLoadingImage: false
    };
  }

  showModal = () => {
    Keyboard.dismiss()

    const { title, message } = this.props

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['Camera', 'Library', 'Cancel'], // TODO use phone language option?
        cancelButtonIndex: 2,
        title,
        message
      }, (buttonIndex) => {
        switch (true) {
          case buttonIndex === 0:
            this.openCamera()
            break
          case buttonIndex === 1:
            this.openGallery()
            break
          default:
            // do nothing
        }
      })
    } else {
      Alert.alert(
        title,
        message,
        [
          {text: 'Cancel'},
          {
            text: 'Gallery',
            onPress: () => {
              this.openGallery()
            }
          },
          {
            text: 'Camera',
            onPress: () => {
              this.openCamera()
            }
          },
        ],
        { cancelable: true }
      )
    }
  }

  openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      loadingLabelText: 'Processing' // TODO use phone language
    }).then(response => {
      this.setState({
        imagePath: response.path,
        imageBase64: response.data
      });
      this.props.onCropped(response.data);
    }).catch(e => {
      switch (true) {
        case e.message === IMAGE_PICKER_ERROR.CANCEL_CAMERA:
          break; // do nothing
        default:
          Alert.alert(
            'Error',
            JSON.stringify(e),
            [{ text: 'OK' }]
          );
      }
    });
  }

  openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      loadingLabelText: 'Processing' // TODO use phone language
    }).then(response => {
      this.setState({
        imagePath: response.path,
        imageBase64: response.data
      });
      this.props.onCropped(response.data);
    }).catch(e => {
      switch (true) {
        case e.message === IMAGE_PICKER_ERROR.CANCEL_IMAGE_SELECTION:
          // do nothing
          break;
        default:
          Alert.alert(
            'Error',
            JSON.stringify(e),
            [{ text: 'OK' }]
          );
      }
    });
  }

  render() {
    return (
      <Wrapper
        style={this.props.style}
        onPress={this.showModal}
        enabled={this.props.disabled || true}
      >
        {this.props.render(this.state)}
     </Wrapper>
    );
  }
}

ImageField.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCropped: PropTypes.func.isRequired,

  initialImagePath: PropTypes.string,
  initialImageBase64: PropTypes.string,
  style: PropTypes.string,
  enabled: PropTypes.bool,
};

export default ImageField;
