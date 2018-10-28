import { all } from 'redux-saga/effects'

import authenticationsSaga from './authentications'

export default function* rootSaga(dispatch) { // passed from `sagaMiddleware.run(sagas, store.dispatch)` in store.js
  yield all([
    authenticationsSaga(),
  ])
}