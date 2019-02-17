import React from 'react';
import Config from 'react-native-config';
import Auth from '@aws-amplify/auth';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import {
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import { ApolloProvider } from 'react-apollo';
import defaults from '../apollo/defaults';
import resolvers from '../apollo/resolvers';
import typeDefs from '../apollo/typeDefs';
import Startup from './screens/Startup';
import IOSPushNotificationListener from './IOSPushNotificationListener';
import Main from './screens/app/Main';
import BottomTabNavigator from './navigators/BottomTabNavigator';
import AuthNavigator from './navigators/AuthNavigator';
import DrawerNavigator from './navigators/DrawerNavigator';

const apolloClient = new ApolloClient({
  uri: Config.API_URL,
  cache: new InMemoryCache(),
  clientState: {
    defaults,
    resolvers,
    typeDefs,
  },
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
});

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

  // TODO: client secret is not supported and will not work

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
});

const RootStack = createSwitchNavigator(
  {
    Startup,
    Auth: AuthNavigator,
    BottomTabNavigator: {
      screen: BottomTabNavigator,
      path: 'bottomTab/:param'
    },
    Drawer: DrawerNavigator,
  },
  {
    initialRouteName: 'Startup',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <React.Fragment>
          <IOSPushNotificationListener />
          <RootStack />
        </React.Fragment>
      </ApolloProvider>
    );
  }
}
