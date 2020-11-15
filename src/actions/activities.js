import { createActions } from 'redux-actions';

export default createActions({
  GET_ACTIVITIES_START: () => {},
  GET_ACTIVITIES_SUCCESS: (activities) => activities,
  GET_ACTIVITIES_ERROR: (error) => error,
});
