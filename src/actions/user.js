import { createActions } from 'redux-actions';

export default createActions({
  GET_USER_START: () => {},
  GET_USER_SUCCESS: (user) => user,
  GET_USER_ERROR: (error) => error,
});
