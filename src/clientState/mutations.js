import gql from 'graphql-tag';

export const UPDATE_ALERT = gql`
  mutation(
    $title: String,
    $body: String,
    $actions: [AlertAction!]!
  ) {
    updateAlert(
      title: $title,
      body: $body,
      actions: $actions,
    ) @client
  }
`;

export const DISMISS_ALERT = gql`
  mutation(
    $action: AlertAction!
  ) {
    dismissAlert(
      action: $action,
    ) @client {
      action {
        text
        alertResponse
      }
    }
  }
`;

export const UPDATE_ALERT_RESPONSE = gql`
  mutation(
    $alertResponse: AlertResponse
  ) {
    updateAlertResponse(
      alertResponse: $alertResponse,
    ) @client 
  }
`;
