import gql from 'graphql-tag';

export const GET_ALERT = gql`
  {
    alert @client {
      title
      body
      actions {
        text
        alertResponse
      }
    }
  }
`;

export const GET_SELECTED_ALERT_RESPONSE = gql`
  {
    selectedAlertResponse @client {
      alertResponse
    }
  }
`;
