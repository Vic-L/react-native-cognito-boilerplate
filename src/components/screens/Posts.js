import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import Button from '../elements/Button';

const GET_POSTS_QUERY = gql`
  query getPosts {
    allPosts(count:4) {
      id
      title
    }
  }
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

class Posts extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Screen Post Title',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text>Menu</Text>
      </TouchableOpacity>
    ),
  })

  render() {
    return (
      <Wrapper>
        <Button
          text="To Products"
          onPress={() => {
            this.props.navigation.navigate('Products');
          }}
        />
        <Button
          text="Toggle Drawer"
          onPress={this.props.navigation.toggleDrawer}
        />
        <Text>Posts</Text>
        <Query query={GET_POSTS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>;
            if (error) return <Text>Error! {error.message}</Text>;

            return data.allPosts.map((post) => <Text key={post.id}>{post.title}</Text>);
          }}
        </Query>
      </Wrapper>
    );
  }
}

export default Posts;
