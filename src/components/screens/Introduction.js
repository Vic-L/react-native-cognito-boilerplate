import React from 'react';
import styled from 'styled-components';

import Button from '../elements/Button';

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const Explanation = styled.Text`
  font-size: 16px;
  font-family: 'Karla-Regular';
  color: black;
  text-align: center;
  margin-bottom: 15px;
`;

const Introduction = props => (
  <Wrapper>
    <Explanation>
      This project seeks to contain all the different navigation stacks
      { '\n' }
      that react-navigation has to offer.
      { '\n' }
      They will serve as examples for each of the projects that will be using this boilerplate.
      { '\n' }
      The RootStack will be a SwitchNavigator for switching between
      { '\n' }
      authenticated screens and non authenticated ones.
      { '\n' }
      InitialRoute of RootStack is the Startup component
      { '\n' }
      that will do a number of actions on boot.
      { '\n' }
      { '\n' }
      DrawerNavigator is next to give access to all the other types of navigators/screens.
      { '\n' }
      MapNavigator is a StackNavigator that will demonstrate a navigation
      { '\n' }
      to another page on click of top right button in header.
    </Explanation>

    <Button
      text="Menu"
      onPress={() => {
        props.navigation.openDrawer();
      }}
    />
  </Wrapper>
);

export default Introduction;
