import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers';
import { session as sessionAction } from '../actions';

import middlewares from './middlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducerClearOnLogout = (state, action) => {
  if (action.type === sessionAction.signOutSuccess().type)
    return rootReducer({}, action);
  return rootReducer(state, action);
};

const store = createStore(
  rootReducerClearOnLogout,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
