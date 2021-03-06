import { handleActions } from 'redux-actions';
import { bookmarks as bookmarksAction } from '../actions';
import Queries from '../utils/queries';
import {
  createBookmark as createBookmarkMutation,
  deleteBookmark as deleteBookmarkMutation,
} from '../utils/mutations';
import throttleThunk from '../utils/throttleThunk';
import { isNil, omit } from 'lodash';

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
    [bookmarksAction.createBookmarkSuccess]: (state, { payload }) => ({
      ...state,
      data: { ...state.data, [payload.id]: payload },
    }),
    [bookmarksAction.deleteBookmarkSuccess]: (state, { payload }) => ({
      ...state,
      data: omit(state.data, payload.id),
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

export const isBookmarked = ({ bookmarks }, { id }) =>
  !isNil(bookmarks.data) &&
  !isNil(
    Object.values(bookmarks.data).find(({ activityId }) => activityId === id),
  );

// THUNKS

/**
 * Get all the bookmarks
 * Note: because this thunk is used by a single Activity component, and Activity component are rendered in list, it is important to
 */
export const fetchBookmarks = throttleThunk(() => {
  return async (dispatch) => {
    dispatch(bookmarksAction.getBookmarksStart());
    try {
      const bookmarks = await Queries.bookmarks();
      dispatch(bookmarksAction.getBookmarksSuccess(bookmarks));
    } catch (error) {
      dispatch(bookmarksAction.getBookmarksError({ error }));
    }
  };
});

/**
 * Create a bookmark
 */
export const postBookmark = (activity) => {
  return async (dispatch) => {
    dispatch(bookmarksAction.createBookmarkStart());
    try {
      const bookmark = await createBookmarkMutation({
        activityId: activity.id,
      });
      dispatch(bookmarksAction.createBookmarkSuccess(bookmark));
      return bookmark;
    } catch (error) {
      dispatch(bookmarksAction.createBookmarkError({ error }));
      throw error;
    }
  };
};

/**
 * Delete a bookmark
 */
export const deleteBookmark = (activity) => {
  return async (dispatch, getState) => {
    const state = getState();
    const { data: bookmarks } = getBookmarks(state);
    const toDelete = bookmarks.find(
      ({ activityId }) => activityId === activity.id,
    );

    dispatch(bookmarksAction.deleteBookmarkStart());
    try {
      const bookmark = await deleteBookmarkMutation(toDelete);
      dispatch(bookmarksAction.deleteBookmarkSuccess(toDelete));
      return bookmark;
    } catch (error) {
      dispatch(bookmarksAction.deleteBookmarkError({ error }));
      throw error;
    }
  };
};
