function mutate(cache, data) {
  cache.writeData({ data });
}

const resolvers = {
  Mutation: {
    updateAlert: (_, {
      title,
      body,
      actions,
    }, { cache }) => {
      const payload = {
        alert: {
          __typename: 'Alert',
          title,
          body,
          actions: actions.map(action => ({
            __typename: 'AlertAction',
            ...action
          }))
        }
      };
      mutate(cache, payload);
      return null;
    },

    dismissAlert: (_, {
      action,
    }, { cache }) => {
      const payload = {
        alert: {
          __typename: 'Alert',
          title: null,
          body: null,
          actions: null,
        },
        selectedAlertResponse: {
          __typename: 'SelectedAlertResponse',
          alertResponse: action.alertResponse
        }
      };
      mutate(cache, payload);
      return null;
    },

    updateAlertResponse: (_, {
      alertResponse,
    }, { cache }) => {
      const payload = {
        selectedAlertResponse: {
          __typename: 'SelectedAlertResponse',
          alertResponse
        }
      };
      mutate(cache, payload);
      return null;
    }
  }
};

export default resolvers;
