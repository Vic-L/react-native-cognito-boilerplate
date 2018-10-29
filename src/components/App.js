import React from 'react'
import {
  View,
  Image,
} from 'react-native'
import createSagaMiddleware from 'redux-saga'
import {
  compose,
  createStore,
  applyMiddleware
} from 'redux'
import { Provider } from  'react-redux'
import Config from 'react-native-config'
import Auth from '@aws-amplify/auth'

// apollo
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {createNetworkStatusNotifier} from 'react-apollo-network-status'

// for listening to `loading` value in each graphql query/mutation on global level
const {
  NetworkStatusNotifier,
  link: networkStatusNotifierLink
} = createNetworkStatusNotifier()

const apolloClient = new ApolloClient({
  link: networkStatusNotifierLink.concat(new HttpLink({ uri: 'https://fakerql.com/graphql' })),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  }
})

// redux related
import rootReducers from '../reducers'

Auth.configure({
  // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
  // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
  
  // REQUIRED - Amazon Cognito Region
  region: Config.COGNITO_AWS_REGION,

  // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
  // Required only if it's different from Amazon Cognito Region
  // identityPoolRegion: 'XX-XXXX-X',

  // OPTIONAL - Amazon Cognito User Pool ID
  userPoolId: Config.COGNITO_USER_POOL_ID,

  // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  userPoolWebClientId: Config.COGNITO_CLIENT_ID,

  // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
  mandatorySignIn: false,

  // // OPTIONAL - Configuration for cookie storage
  // cookieStorage: {
  // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
  //     domain: '.yourdomain.com',
  // // OPTIONAL - Cookie path
  //     path: '/',
  // // OPTIONAL - Cookie expiration in days
  //     expires: 1,
  // // OPTIONAL - Cookie secure flag
  //     secure: true
  // },

  // OPTIONAL - customized storage object
  // storage: new MyStorage(),
  
  // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
  // authenticationFlowType: 'USER_PASSWORD_AUTH'
})

// middlewares
const middlewares = []

const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)
 
const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducers)

// sagas
import sagas from '../sagas'
sagaMiddleware.run(sagas, store.dispatch)

// screens
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
} from 'react-navigation'
/// components
/// misc
import Startup from './screens/Startup'
import Loader from './screens/Loader'
//// authstack
import Welcome from './screens/auth/Welcome'
import Login from './screens/auth/Login'
import Signup from './screens/auth/Signup'
import ForgotPassword from './screens/auth/ForgotPassword'
import ConfirmSignup from './screens/auth/ConfirmSignup'
import ForgotPasswordSubmit from './screens/auth/ForgotPasswordSubmit'
import IOSPushNotificationListener from './IOSPushNotificationListener'

//// appstack
import Main from './screens/app/Main'

//// bottomTabsStack
import Forms from './screens/bottomTabs/Forms'
import Posts from './screens/bottomTabs/Posts'
import Products from './screens/common/Products'

const AuthStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        headerTransparent: true
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerTransparent: true
      }
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        headerTransparent: true
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        headerTransparent: true
      }
    },
    ConfirmSignup: {
      screen: ConfirmSignup,
      navigationOptions: {
        headerTransparent: true
      }
    },
    ForgotPasswordSubmit: {
      screen: ForgotPasswordSubmit,
      navigationOptions: {
        headerTransparent: true
      }
    },
  },
  {
    initialRouteName: 'Welcome',
  }
)

const AppStack = createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        headerTransparent: true
      }
    },
  },
  {
    initialRouteName: 'Main',
  }
)

const BottomTabs = createBottomTabNavigator({
    Posts: {
      screen: Posts,
      navigationOptions: {
        // tabBarIcon: TODO,
        tabBarLabel: 'My Posts'
      }
    },
    Forms: {
      screen: Forms,
    },
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    initialRouteName: 'Posts',
    order: ['Posts', 'Forms'],
    backBehavior: 'none',
    tabBarOptions: {
      activeTintColor: 'black',
      activeBackgroundColor: 'red',
      inactiveTintColor: 'white',
      inactiveBackgroundColor: 'white',
      showLabel: true,
      style: {},
      labelStyle: {
        fontSize: 12,
        color: 'blue'
      },
      tabStyle: {},
      allowFontScaling: true,
    }
  }
)

const NavStack = createStackNavigator(
  {
    Posts: {
      screen: Posts,
      navigationOptions: {
        headerTitle: 'Posts',
      }
    },
    Products: {
      screen: Products,
      navigationOptions: {
        headerTransparent: true,
        headerTitle: 'Products',
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
          source={require('../images/icons/magnifying_glass.jpg')}
        />
      ),
    }),
  }
)

const Drawer = createDrawerNavigator({
  NavStack: NavStack
})

////////// ROOT STACK //////////

const RootStack = createSwitchNavigator(
  {
    Startup: Startup,
    Auth: AuthStack,
    App: AppStack,
    BottomTabs: BottomTabs,
    Drawer: Drawer,
  },
  {
    initialRouteName: 'Startup',
  }
)

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <View style={{flex: 1}}>
            <IOSPushNotificationListener/>
            <RootStack/>
            <NetworkStatusNotifier render={({loading, error}) => (
              <Loader loading={loading} error={error}/>
            )}/>
          </View>
        </Provider>
      </ApolloProvider>
    )
  }
}
