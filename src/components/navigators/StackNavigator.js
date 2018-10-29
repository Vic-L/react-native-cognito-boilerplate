import {
  createStackNavigator,
} from 'react-navigation'

import Posts from '../screens/Posts'
import Products from '../screens/Products'

const StackNavigator = createStackNavigator(
  {
    Posts: {
      screen: Posts,
      navigationOptions: {
        headerTitle: 'StackNav Posts Header',
      }
    },
    Products: {
      screen: Products,
      navigationOptions: {
        headerTransparent: true,
        headerTitle: 'StackNav Products Header',
      }
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      initialRouteName: 'Posts',
      headerMode: 'screen',
      drawerLabel: 'Posts >',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../../images/icons/magnifying_glass.jpg')}
        />
      ),
    }),
  }
)

export default StackNavigator