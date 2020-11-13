import { handleActions, combineActions } from 'redux-actions';
import { session } from '../actions';

const INITIAL_STATE = {
  isLoading: true,
  name: null,
};

export default handleActions(
  {
    [combineActions(
      session.sessionRestoreSuccess,
      session.signInSuccess,
      session.signUpSuccess,
    )]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      name: payload.name,
    }),
  },
  INITIAL_STATE,
);
