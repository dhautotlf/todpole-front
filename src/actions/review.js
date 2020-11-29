import { createActions } from 'redux-actions';

export default createActions({
  CREATE_REVIEW_START: () => {},
  CREATE_REVIEW_SUCCESS: (review) => review,
  CREATE_REVIEW_ERROR: (error) => error,
});
