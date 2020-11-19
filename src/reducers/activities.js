import { handleActions, combineActions } from 'redux-actions';
import { activities as activitiesAction } from '../actions';
import Queries from '../utils/queries';
import { createActivity as createActivityMutation } from '../utils/mutations';

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
    [combineActions(activitiesAction.createActivityStart)]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [combineActions(
      activitiesAction.createActivitySuccess,
      activitiesAction.getActivitySuccess,
    )]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      data: { ...state.data, [payload.id]: payload },
    }),
    [combineActions(
      activitiesAction.createActivityError,
      activitiesAction.getActivityError,
    )]: (state, { payload }) => ({
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

export const getActivity = ({ activities }, id) => activities.data[id];

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

export const fetchActivity = (id) => {
  return async (dispatch) => {
    dispatch(activitiesAction.getActivityStart());
    try {
      const activity = await Queries.activity({ id });
      dispatch(activitiesAction.getActivitySuccess(activity));
    } catch (error) {
      dispatch(activitiesAction.getActivityError({ error }));
    }
  };
};

/**
 * Create all the activities
 */
export const postActivity = (activityInput) => {
  return async (dispatch) => {
    dispatch(activitiesAction.createActivityStart());
    try {
      const activity = await createActivityMutation(activityInput);
      dispatch(activitiesAction.createActivitySuccess(activity));
      return activity;
    } catch (error) {
      dispatch(activitiesAction.createActivityError({ error }));
      throw error;
    }
  };
};
