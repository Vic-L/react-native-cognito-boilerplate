import React from 'react';
import {
  Text,
  ScrollView,
} from 'react-native';
import {
  DrawerItems,
  SafeAreaView
} from 'react-navigation';
import styled from 'styled-components';

const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

const DrawerContentComponent = (props) => (
  <ScrollView>
    <Wrapper forceInset={{ top: 'always', horizontal: 'never' }}>
      <Text>App Title</Text>
      <DrawerItems {...props} />
    </Wrapper>
  </ScrollView>
);

export default DrawerContentComponent;
