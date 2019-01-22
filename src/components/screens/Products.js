import React from 'react';
import {
  Alert,
  Text,
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import ButtonWithLoader from '../elements/ButtonWithLoader';

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
  constructor(props) {
    super(props);

    this.refetchButton = React.createRef();
  }

  requestRefetch(refetch) {
    Alert.alert(
      '',
      'Are you sure?',
      [
        { text: 'No' },
        {
          text: 'Yes',
          onPress: refetch
        },
      ]
    );
  }

  render() {
    return (
      <Wrapper>
        <Text>Products</Text>
        <Query query={GET_PRODUCTS_QUERY}>
          {({ loading, error, data, refetch }) => {
            const { current: button } = this.refetchButton;

            if (loading) {
              if (button) {
                button.load();
              }
              return <Text>Loading...</Text>;
            }
            if (error) {
              if (button) {
                button.reset();
              }
              return <Text>Error! {error.message}</Text>;
            }

            if (button) {
              button.reset();
            }

            const productsList = data.allProducts.map((product) => 
              <Text key={product.id}>{product.name}</Text>
            );

            return (
              <React.Fragment>
                <ButtonWithLoader
                  label='Refetch'
                  style={{
                    alignSelf: 'center',
                  }}
                  noBorder
                  expandOnFinish
                  ref={this.refetchButton}
                  onPress={this.requestRefetch.bind(this, refetch)}
                />
                {productsList}
              </React.Fragment>
            );
          }}
        </Query>
      </Wrapper>
    );
  }
}

export default Products;
