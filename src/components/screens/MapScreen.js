import React from 'react';
import styled from 'styled-components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const Wrapper = styled.View`
  flex: 1;
  background-color: red;
`;

const MapScreen = () => (
  <Wrapper>
    <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 1.3521,
        longitude: 103.8198,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      showsUserLocation
    />
  </Wrapper>
);

export default MapScreen;
