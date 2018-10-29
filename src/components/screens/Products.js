import _ from 'lodash'
import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET_PRODUCTS_QUERY = gql`
  query getProducts {
    allProducts(count:4) {
      id
      name
    }
  }
`;

class Products extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
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
      </View>
    )
  }
}

export default Products