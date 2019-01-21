import _ from 'lodash';
import React from 'react';
import {
  Text,
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';

const GET_PRODUCTS_QUERY = gql`
  query getProducts {
    allProducts(count:4) {
      id
      name
    }
  }
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

class Products extends React.Component {
  render() {
    return (
      <Wrapper>
        <Text>Products</Text>
        <Query query={GET_PRODUCTS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>
            if (error) return <Text>Error! {error.message}</Text>

            return data.allProducts.map((product) => {
              return (
                <Text key={product.id}>{product.name}</Text>
              )
            })
          }}
        </Query>
      </Wrapper>
    )
  }
}

export default Products;
