import _ from 'lodash';
import React from 'react';
import {
  Text,
} from 'react-native';
import styled from 'styled-components';

import ImageField from '../elements/ImageField';
import TextField from '../elements/TextField';

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.View`
  background-color: blue;
  width: 150px;
  height: 150px;
`;

const Image = styled.Image`
  width: 100%;
  height: undefined; /* https://stackoverflow.com/a/53482563/2667545 */
  aspect-ratio: 1;
`;

class Forms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageBase64: null,
      // randomly set initial image path (edit vs create)
      imagePath: [
        'https://store.donanimhaber.com/ae/0c/c4/ae0cc4f398e19a24a9b0434dcec0c365.png',
        null,
      ][Math.floor(Math.random() * 2)],
      textFieldValue: null,
    };

    this.onCropped = this.onCropped.bind(this);
    this.onChangeTextField = this.onChangeTextField.bind(this);
  }

  onCropped(imageBase64, imagePath) {
    this.setState({ imageBase64, imagePath });
  }

  onChangeTextField(textFieldValue) {
    this.setState({
      textFieldValue,
    });
  }

  render() {
    const {
      imagePath,
      imageBase64,
      textFieldValue,
    } = this.state;

    return (
      <Wrapper>
        <Text>Forms</Text>

        <Text>TextField</Text>
        <TextField
          label="LABEL"
          value={textFieldValue}
          error={null}
          placeholder="Placeholder"
          onChangeText={this.onChangeTextField}
        />

        <Text>ImageField</Text>
        <ImageField
          title="Add image"
          message="Description of what this image is for"
          onCropped={this.onCropped}
        >
          {() => {
            let image = null;
            if (
              _.isNull(imagePath)
              && _.isNull(imageBase64)
            ) {
              image = <Image source={require('../../images/icons/magnifying_glass.jpg')} />;
            } else {
              image = <Image source={{ uri: imagePath }} />;
            }

            return (
              <ImageContainer>
                {image}
              </ImageContainer>
            );
          }}
        </ImageField>
      </Wrapper>
    );
  }
}

export default Forms;
