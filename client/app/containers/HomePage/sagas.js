import { serverUrl } from 'config';
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';

import { LOAD_ARTISTLIST } from './constants';
import { artistListLoaded, artistListLoadingError } from './actions';


export function* getArtistList() {
  const requestURL = `${serverUrl}/artists`;

  try {
    // Call our request helper (see 'utils/request')
    const artistList = yield call(request, requestURL);
    yield put(artistListLoaded(artistList));
  } catch (err) {
    yield put(artistListLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* artistListData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_ARTISTLIST, getArtistList);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  artistListData,
];
