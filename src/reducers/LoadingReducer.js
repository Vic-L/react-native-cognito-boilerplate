// inspired from https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
// require all action types to follow naming convention with trailing _REQUEST/SUCCESS/FAILURE
const LoadingReducer = (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE|DONE)$/.exec(type)

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state

  // will only add <ACTION>_REQUEST to LoadingReducer to indicate still loading
  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  }
}

export default LoadingReducer