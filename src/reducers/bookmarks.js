import { handleActions, combineActions } from 'redux-actions';
import { bookmarks as bookmarksAction } from '../actions';
import Queries from '../utils/queries';
import { createBookmark as createBookmarkMutation } from '../utils/mutations';
import { isEmpty } from 'lodash';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
};

const normalize = (bookmarks) =>
  bookmarks.reduce(
    (acc, bookmark) => ({ ...acc, [bookmark.id]: bookmark }),
    {},
  );

export default handleActions(
  {
    [bookmarksAction.getBookmarksStart]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [bookmarksAction.getBookmarksSuccess]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      data: normalize(payload),
    }),
    [bookmarksAction.getBookmarksError]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: payload.error,
    }),
  },
  INITIAL_STATE,
);

// SELECTORS

export const getBookmarks = ({ bookmarks }) => ({
  ...bookmarks,
  data: bookmarks.data ? Object.values(bookmarks.data) : INITIAL_STATE.data,
});

export const getBookmarkedActivities = ({ activities, bookmarks }) => ({
  isLoading: activities.isLoading || bookmarks.isLoading,
  data: bookmarks.data
    ? Object.values(bookmarks.data).map(
        ({ activityId }) => activities.data[activityId],
      )
    : bookmarks.data,
});

export const getBookmark = ({ bookmarks }, id) => bookmarks.data[id];

// THUNKS

/**
 * Get all the bookmarks
 */
export const fetchBookmarks = () => {
  return async (dispatch) => {
    dispatch(bookmarksAction.getBookmarksStart());
    try {
      const bookmarks = await Queries.bookmarks();
      dispatch(bookmarksAction.getBookmarksSuccess(bookmarks));
    } catch (error) {
      dispatch(bookmarksAction.getBookmarksError({ error }));
    }
  };
};

/**
 * Create a the bookmarks
 */
export const postBookmark = (activity) => {
  return async (dispatch) => {
    dispatch(bookmarksAction.createBookmarkStart());
    try {
      const bookmark = await createBookmarkMutation(activity.id);
      dispatch(bookmarksAction.createBookmarkSuccess(bookmark));
      return bookmark;
    } catch (error) {
      dispatch(bookmarksAction.createBookmarkError({ error }));
      throw error;
    }
  };
};
