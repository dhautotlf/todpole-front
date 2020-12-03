import { handleActions, combineActions } from 'redux-actions';
import { activities as activitiesAction } from '../actions';
import { review as reviewAction } from '../actions';
import Queries from '../utils/queries';
import { createActivity as createActivityMutation } from '../utils/mutations';
import { createReview as createReviewMutation } from '../utils/mutations';
import { uploadImageFromLocalFile } from '../utils/api/apiCloudinary';
import { get } from 'lodash';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
};

const normalize = (activities) =>
  activities.reduce(
    (acc, activity) => ({ ...acc, [activity.id]: activity }),
    {},
  );

const addReviewToActivity = (state, review) => {
  return {
    ...state.data,
    [review.activityId]: {
      ...state.data[review.activityId],
      reviewList: [...state.data[review.activityId].reviewList, review],
    },
  };
};

export default handleActions(
  {
    [activitiesAction.getActivitiesStart]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [reviewAction.createReviewStart]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [reviewAction.createReviewSuccess]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      data: addReviewToActivity(state, payload),
    }),
    [activitiesAction.getActivitiesSuccess]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      data: normalize(payload),
    }),
    [activitiesAction.getActivitiesError]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: payload.error,
    }),
    [activitiesAction.createActivityStart]: (state) => ({
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
      reviewAction.createReviewError,
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

export const getUserActivities = ({ activities }, user) => ({
  ...activities,
  data: activities.data
    ? Object.values(activities.data).filter(({ userId }) => user.id === userId)
    : INITIAL_STATE.data,
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
 * Create one activity
 */
export const postActivity = (activityInput) => {
  return async (dispatch) => {
    dispatch(activitiesAction.createActivityStart());
    try {
      // Upload the images through the local path
      const pathList = activityInput.activityImageList.map((t) => t.url);
      const results = await Promise.all(
        pathList.map((p) => uploadImageFromLocalFile(p)),
      );
      // Assign images to the activityInput object
      activityInput.activityImageList = results.map((r, i) => ({
        isMain: !i,
        url: r,
      }));

      const activity = await createActivityMutation(activityInput);
      dispatch(activitiesAction.createActivitySuccess(activity));
      return activity;
    } catch (error) {
      dispatch(activitiesAction.createActivityError({ error }));
      error.errorMessage = get(error, 'graphQLErrors[0].message', null);
      throw error;
    }
  };
};

/**
 * Create a review
 */
export const postReview = (review) => {
  return async (dispatch) => {
    dispatch(reviewAction.createReviewStart());
    try {
      const reviewInput = await createReviewMutation({
        activityId: review.activityId,
        rating: review.rating,
        text: review.text,
      });
      dispatch(reviewAction.createReviewSuccess(reviewInput));
      return reviewInput;
    } catch (error) {
      dispatch(reviewAction.createReviewError({ error }));
      throw error;
    }
  };
};
