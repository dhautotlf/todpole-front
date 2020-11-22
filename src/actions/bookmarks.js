import { createActions } from 'redux-actions';

export default createActions({
  GET_BOOKMARKS_START: () => {},
  GET_BOOKMARKS_SUCCESS: (bookmarks) => bookmarks,
  GET_BOOKMARKS_ERROR: (error) => error,
  CREATE_BOOKMARK_START: () => {},
  CREATE_BOOKMARK_SUCCESS: (bookmark) => bookmark,
  CREATE_BOOKMARK_ERROR: (error) => error,
  DELETE_BOOKMARK_START: () => {},
  DELETE_BOOKMARK_SUCCESS: (bookmark) => bookmark,
  DELETE_BOOKMARK_ERROR: (error) => error,
});
