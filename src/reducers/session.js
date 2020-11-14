import { handleActions, combineActions } from 'redux-actions';
import { session as sessionAction } from '../actions';
import {
  register as registerMutation,
  login as loginMutation,
} from '../utils/mutations';
import { current as getCurrentUser } from '../utils/queries';
import Storage from '../utils/storageUtils';
import AuthHeader from '../utils/authHeader';

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
    [sessionAction.signOutSuccess]: (state) => ({
      ...state,
      isLoading: false,
      userToken: INITIAL_STATE.userToken,
    }),
    [combineActions(
      sessionAction.sessionRestoreError,
      sessionAction.signInError,
      sessionAction.signUpError,
      sessionAction.signOutError,
    )]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: payload.error,
    }),
  },
  INITIAL_STATE,
);

// SELECTORS

export const isAuthenticated = ({ session }) =>
  session.userToken !== INITIAL_STATE.userToken;

// THUNKS

/**
 * Function to read the session store in the local storage
 */
export const restoreSession = () => {
  return async (dispatch) => {
    dispatch(sessionAction.sessionRestoreStart());
    try {
      const session = await Storage.restoreSession();
      AuthHeader.getInstance().setSession(session);
      const user = await getCurrentUser();
      if (!user) throw Error('Session Invalid or Expired');

      dispatch(sessionAction.sessionRestoreSuccess(session));
    } catch (error) {
      dispatch(sessionAction.sessionRestoreError({ error }));
    }
  };
};

/** Function to sign up
 * @params creds: object
 * @params creds.login: string
 * @params creds.password: string
 */
export const register = (creds) => {
  return async (dispatch) => {
    dispatch(sessionAction.signUpStart());
    try {
      const session = await registerMutation(creds);
      await Storage.storeSession(session);
      AuthHeader.getInstance().setSession(session);
      dispatch(sessionAction.signUpSuccess(session));
    } catch (error) {
      console.log({ error });
      dispatch(sessionAction.signUpError({ error }));
    }
  };
};

/** Function to sign in
 * @params creds: object
 * @params creds.login: string
 * @params creds.password: string
 */
export const authenticate = (creds) => {
  return async (dispatch) => {
    dispatch(sessionAction.signInStart());
    try {
      const session = await loginMutation(creds);
      await Storage.storeSession(session);
      AuthHeader.getInstance().setSession(session);
      dispatch(sessionAction.signInSuccess(session));
    } catch (error) {
      dispatch(sessionAction.signInError({ error }));
    }
  };
};

/** Function to sign out
 * Clears the session local storage, and the auth header singleton
 */
export const signOut = () => {
  return async (dispatch) => {
    dispatch(sessionAction.signOutStart());
    try {
      dispatch(sessionAction.signOutSuccess());
      AuthHeader.destroyInstance();
      await Storage.clearSession();
    } catch (error) {
      dispatch(sessionAction.signOutError({ error }));
    }
  };
};
