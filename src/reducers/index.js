import { combineReducers } from 'redux'

import LoadingReducer from './LoadingReducer'

export default combineReducers({
  loading: LoadingReducer,
})