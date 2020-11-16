import { handleActions, combineActions } from 'redux-actions';
import { activities as activitiesAction } from '../actions';
import Queries from '../utils/queries';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
};

const normalize = (activities) =>
  activities.reduce(
    (acc, activity) => ({ ...acc, [activity.id]: activity }),
    {},
  );

export default handleActions(
  {
    [activitiesAction.getActivitiesStart]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [combineActions(activitiesAction.getActivitiesSuccess)]: (
      state,
      { payload },
    ) => ({
      ...state,
      isLoading: false,
      data: normalize(payload),
    }),
    [combineActions(activitiesAction.getActivitiesError)]: (
      state,
      { payload },
    ) => ({
      ...state,
      isLoading: false,
      error: payload.error,
    }),
  },
  INITIAL_STATE,
);

// SELECTORS

export const getActivities = ({ activities }) => ({
  ...activities,
  data: activities.data ? Object.values(activities.data) : INITIAL_STATE.data,
});

// THUNKS

/**
 * Get all the activities
 */
export const fetchActivities = () => {
  return async (dispatch) => {
    dispatch(activitiesAction.getActivitiesStart());
    try {
      const activities = await Queries.activities();
      dispatch(activitiesAction.getActivitiesSuccess(activities));
    } catch (error) {
      dispatch(activitiesAction.getActivitiesError({ error }));
    }
  };
};
