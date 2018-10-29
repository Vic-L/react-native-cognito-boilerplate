import React from 'react'
import {
  Text,
  ScrollView,
} from 'react-native'
import {
  DrawerItems,
  SafeAreaView
} from 'react-navigation'

const DrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.containerStyle} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Text>App Title</Text>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = {
  containerStyle: {
    flex: 1,
  },
}

export default DrawerContentComponent