import _ from 'lodash'
import React from 'react'
import {
  View,
  Text,
  Image,
} from 'react-native'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Button from '../../elements/Button'

const GET_POSTS_QUERY = gql`
  query getPosts {
    allPosts(count:4) {
      id
      title
    }
  }
`;

class PostsWithDrawer extends React.Component {
  static navigationOptions = {
    drawerLabel: 'PostsWithDrawer',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../../images/icons/magnifying_glass.jpg')}
      />
    ),
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Button
          onPress={() => this.props.navigation.toggleDrawer()}
          text="Toggle Drawer"
        />
        <Text>PostsWithDrawer</Text>
        <Query query={GET_POSTS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>
            if (error) return <Text>Error! {error.message}</Text>

            return data.allPosts.map((post) => {
              return (
                <Text key={post.id}>{post.title}</Text>
              )
            })
          }}
        </Query>
      </View>
    )
  }
}

export default PostsWithDrawer