import React from 'react'
import {
  TouchableOpacity,
  Keyboard,
  ActionSheetIOS,
  Platform,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import PropTypes from 'prop-types'

const IMAGE_PICKER_ERROR = {
  CANCEL_IMAGE_SELECTION: "User cancelled image selection",
  CANCEL_CAMERA: "User cancelled image selection",
}

class ImageField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageBase64: null,
      imagePath: props.initialImagePath, // for initial image eg during edit
      isModalVisible: false,
      isLoadingImage: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { imagePath } = this.state
    if (prevState.imagePath !== imagePath) {
      this.setState({imagePath})
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={this.props.style}
        onPress={this.showModal}
        enabled={this.props.disabled || true}>
        {this.props.render(this.state)}
     </TouchableOpacity>
    )
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
      // TODO do AlertsReducer first
      // this.props.showAlert(
      //   title,
      //   message,
      //   [
      //     {
      //       text: 'Cancel',
      //       onPress: this.props.dismissAlert
      //     },
      //     {
      //       text: 'Gallery',
      //       onPress: () => {
      //         this.props.dismissAlert()
      //         this.openGallery()
      //       }
      //     },
      //     {
      //       text: 'Camera',
      //       onPress: () => {
      //         this.props.dismissAlert()
      //         this.openCamera()
      //       }
      //     },
      //   ],
      //   { cancelable: true }
      // )
    }
  }

  openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      loadingLabelText: "Processing" // TODO use phone language
    }).then(response => {
      this.setState({
        imagePath: response.path,
        imageBase64: response.data
      })
      this.props.onCropped(response.data)
    }).catch(e => {
      switch (true) {
        case e.message === IMAGE_PICKER_ERROR.CANCEL_CAMERA:
          break // do nothing
        default:
          alert(e)
      }
    })
  }

  openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      loadingLabelText: "Processing" // TODO use phone language
    }).then(response => {
      this.setState({
        imagePath: response.path,
        imageBase64: response.data
      })
      this.props.onCropped(response.data)
    }).catch(e => {
      switch (true) {
        case e.message === IMAGE_PICKER_ERROR.CANCEL_IMAGE_SELECTION:
          // do nothing
          break
        default:
          alert(e)
      }
    })
  }
}

ImageField.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCropped: PropTypes.func.isRequired,

  initialImagePath: PropTypes.string,
  initialImageBase64: PropTypes.string,
  style: PropTypes.object,
  enabled: PropTypes.bool,
}

export default ImageField