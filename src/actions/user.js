import { createActions } from 'redux-actions';

export default createActions({
  USER: {
    RESTORE_SESSION_START: () => {},
    RESTORE_SESSION_SUCCESS: (session) => session,
    RESTORE_SESSION_ERROR: (error) => error,
    //
    STORE_SESSION_START: () => {},
    STORE_SESSION_SUCCESS: (session) => session,
    STORE_SESSION_ERROR: (error) => error,
    //
    SIGN_IN_START: () => {},
    SIGN_IN_SUCCESS: (session) => session,
    SIGN_IN_ERROR: (error) => error,
    //
    SIGN_UP_START: () => {},
    SIGN_UP_SUCCESS: (session) => session,
    SIGN_UP_ERROR: (error) => error,
  },
});
