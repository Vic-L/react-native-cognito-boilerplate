import _ from 'lodash'
import React from 'react'
import {
  View,
  Text,
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

class Posts extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Button
          text="To Products"
          onPress={this.navigateToProducts.bind(this)}/>
        <Text>Posts</Text>
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

  navigateToProducts() {
    this.props.navigation.navigate('Products')
  }
}

export default Posts