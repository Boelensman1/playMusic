/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectArtistList = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('artistList')
);

const makeSelectPlayState = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('nowPlaying') && globalState.get('nowPlaying').state
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectArtistList,
  makeSelectLocationState,
  makeSelectPlayState,
};
