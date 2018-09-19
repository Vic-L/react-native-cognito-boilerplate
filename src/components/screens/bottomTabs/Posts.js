import _ from 'lodash'
import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const getPostsQuery = gql`
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
        <Text>Posts</Text>
        {this.renderPosts()}
      </View>
    )
  }

  renderPosts() {
    if (_.isNil(this.props.data.allPosts)) {
      return null
    }
    return this.props.data.allPosts.map((post) => {
      return (
        <Text key={post.id}>{post.title}</Text>
      )
    })
  }
}

export default graphql(getPostsQuery)(Posts)