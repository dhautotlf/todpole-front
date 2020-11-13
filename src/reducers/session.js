import { handleActions, combineActions } from 'redux-actions';
import { session as sessionAction } from '../actions';
import { register as registerMutation } from '../utils/mutations';
import { current as getCurrentUser } from '../utils/queries';
import Storage from '../utils/storageUtils';

const INITIAL_STATE = {
  isLoading: true,
  userToken: null,
};

export default handleActions(
  {
    [combineActions(
      sessionAction.signInStart,
      sessionAction.signUpStart,
      sessionAction.sessionRestoreStart,
    )]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [combineActions(
      sessionAction.sessionRestoreSuccess,
      sessionAction.signInSuccess,
      sessionAction.signUpSuccess,
    )]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      userToken: payload.userToken,
    }),
    [combineActions(
      sessionAction.sessionRestoreError,
      sessionAction.signInError,
      sessionAction.signUpError,
    )]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: payload.error,
    }),
  },
  INITIAL_STATE,
);

export const restoreSession = () => {
  return async (dispatch) => {
    dispatch(sessionAction.sessionRestoreStart());
    try {
      const session = await Storage.restoreSession();
      const user = await getCurrentUser();
      if (!user) throw Error('Session Invalid or Expired');

      dispatch(sessionAction.sessionRestoreSuccess(session));
    } catch (error) {
      dispatch(sessionAction.sessionRestoreError({ error }));
    }
  };
};

export const register = ({ login, password }) => {
  return async (dispatch) => {
    dispatch(sessionAction.signUpStart());
    try {
      const session = await registerMutation({
        login,
        password,
      });
      await Storage.storeSession(session);
      dispatch(sessionAction.signUpSuccess(session));
    } catch (error) {
      dispatch(sessionAction.signUpError({ error }));
    }
  };
};

export const authenticate = ({ login, password }) => {
  return async (dispatch) => {
    dispatch(sessionAction.signInStart());
    try {
      const session = await registerMutation({
        login,
        password,
      });
      await Storage.storeSession(session);
      dispatch(sessionAction.signInSuccess(session));
    } catch (error) {
      dispatch(sessionAction.signInError({ error }));
    }
  };
};
