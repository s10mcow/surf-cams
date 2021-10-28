import { takeLatest, put } from 'redux-saga/effects'
import TYPES from './beaches.types'
import actions from './beaches.actions'

function* setCountry({ payload }) {
  try {
    yield put(actions.setCountry.success(payload))
    yield put({ type: 'SET_NEW_COUNTRY', payload })
  } catch (e) {
    console.log(e)
  }
}

export function* fetchAllMediaListener() {
  yield takeLatest(TYPES.SET_COUNTRY, setCountry)
}

export default [fetchAllMediaListener]
