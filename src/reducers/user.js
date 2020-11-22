import { handleActions } from 'redux-actions';
import { user as userActions } from '../actions';
import Queries from '../utils/queries';
import { get } from 'lodash';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
};

export default handleActions(
  {
    [userActions.getUserStart]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [userActions.getUserSuccess]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      data: payload,
    }),
    [userActions.getUserError]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: payload.error,
    }),
  },
  INITIAL_STATE,
);

// SELECTORS

export const getUser = ({ user }) => ({
  ...user,
  errorMessage: get(user, 'error.graphQLErrors[0].message', null),
});

// THUNKS

/**
 * Function to read the session store in the local storage
 */
export const fetchUser = () => {
  return async (dispatch) => {
    dispatch(userActions.getUserStart());
    try {
      const user = await Queries.current();
      dispatch(userActions.getUserSuccess(user));
    } catch (error) {
      dispatch(userActions.getUserError({ error }));
    }
  };
};
