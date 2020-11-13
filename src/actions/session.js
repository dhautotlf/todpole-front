import { createActions } from 'redux-actions';

export default createActions({
  SESSION_RESTORE_START: () => {},
  SESSION_RESTORE_SUCCESS: (session) => session,
  SESSION_RESTORE_ERROR: (error) => error,

  SESSION_STORE_START: () => {},
  SESSION_STORE_SUCCESS: (session) => session,
  SESSION_STORE_ERROR: (error) => error,

  SIGN_IN_START: () => {},
  SIGN_IN_SUCCESS: (session) => session,
  SIGN_IN_ERROR: (error) => error,

  SIGN_UP_START: () => {},
  SIGN_UP_SUCCESS: (session) => session,
  SIGN_UP_ERROR: (error) => error,
});
