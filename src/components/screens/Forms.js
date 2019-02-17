import _ from 'lodash';
import React from 'react';
import {
  Text,
} from 'react-native';
import styled from 'styled-components';

import ImageField from '../elements/ImageField';

import {
  CachedImage,
  ImageCacheProvider
} from 'react-native-cached-image';

const Image = styled(CachedImage)`
  width: 100%;
  height: undefined; /* https://stackoverflow.com/a/53482563/2667545 */
  aspect-ratio: 1;
`;

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

class Forms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageBase64: null,
      initialImagePath: [
        'https://store.donanimhaber.com/ae/0c/c4/ae0cc4f398e19a24a9b0434dcec0c365.png',
        null
      ][Math.floor(Math.random() * 2)],
    };
  }

  render() {
    return (
      <Wrapper>
        <Text>Forms</Text>
        <ImageField
          initialImagePath={this.state.initialImagePath}
          title='Add image'
          message='Description of what this image is for'
          onCropped={(imageBase64) => {
            this.setState({ imageBase64 });
          }}>
          {({ imagePath }) => {
            let image = null;
            if (_.isNil(imagePath)) {
              image = <Image source={require('../../images/icons/magnifying_glass.jpg')} />;
            } else {
              image = (
                <ImageCacheProvider
                  urlsToPreload={[
                    imagePath
                  ]}
                >
                  <Image source={{ uri: imagePath }} />
                </ImageCacheProvider>
              );
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
