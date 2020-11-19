import { handleActions, combineActions } from 'redux-actions';
import { session as sessionAction } from '../actions';
import {
  register as registerMutation,
  login as loginMutation,
} from '../utils/mutations';
import Queries from '../utils/queries';
import Storage from '../utils/storageUtils';
import AuthHeader from '../utils/authHeader';
import { uploadImageFromLocalFile } from '../utils/api/apiCloudinary';
import { get, has } from 'lodash';

const INITIAL_STATE = {
  isLoading: false,
  userToken: null,
};

export default handleActions(
  {
    [sessionAction.sessionRestoreStart]: (state) => ({
      ...state,
      isRestoring: true,
    }),
    [sessionAction.sessionRestoreSuccess]: (state, { payload }) => ({
      ...state,
      isRestoring: false,
      userToken: payload,
    }),
    [sessionAction.sessionRestoreError]: (state) => ({
      ...state,
      isRestoring: false,
    }),
    [combineActions(sessionAction.signInStart, sessionAction.signUpStart)]: (
      state,
    ) => ({
      ...state,
      isLoading: true,
    }),
    [combineActions(
      sessionAction.signInSuccess,
      sessionAction.signUpSuccess,
    )]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      userToken: payload,
    }),
    [combineActions(
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

export const isAuthenticated = ({ session }) => ({
  isLoading: session.isLoading,
  isRestoring: session.isRestoring,
  data: session.userToken !== INITIAL_STATE.userToken,
});

export const getSession = ({ session }) => ({
  ...session,
  errorMessage: get(session, 'error.graphQLErrors[0].message', null),
});

// THUNKS

/**
 * Function to read the session store in the local storage
 */
export const restoreSession = () => {
  return async (dispatch) => {
    dispatch(sessionAction.sessionRestoreStart());
    try {
      const session = await Storage.restoreSession();
      AuthHeader.getInstance().setTokens(session);
      const user = await Queries.current();
      if (!user) throw Error('Session Invalid or Expired');
      dispatch(sessionAction.sessionRestoreSuccess(session));
    } catch (error) {
      AuthHeader.destroyInstance();
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
      // Extract the toddler information in order to upload the image
      const toddler = creds?.toddlerList?.[0];
      if (has(creds, 'toddlerList.[0].photo')) {
        toddler.photo = await uploadImageFromLocalFile(
          get(creds, 'toddlerList.[0].photo'),
        );
      }
      // Register the user with the toddler's uploaded picture URL
      const session = await registerMutation(creds);
      await Storage.storeSession(session);

      AuthHeader.getInstance().setTokens(session);
      dispatch(sessionAction.signUpSuccess(session));
    } catch (error) {
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
      AuthHeader.getInstance().setTokens(session);
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
