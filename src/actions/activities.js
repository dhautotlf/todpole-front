import { createActions } from 'redux-actions';

export default createActions({
  GET_ACTIVITIES_START: () => {},
  GET_ACTIVITIES_SUCCESS: (activities) => activities,
  GET_ACTIVITIES_ERROR: (error) => error,
  GET_ACTIVITY_START: () => {},
  GET_ACTIVITY_SUCCESS: (activity) => activity,
  GET_ACTIVITY_ERROR: (error) => error,
  CREATE_ACTIVITY_START: () => {},
  CREATE_ACTIVITY_SUCCESS: (activity) => activity,
  CREATE_ACTIVITY_ERROR: (error) => error,
});
