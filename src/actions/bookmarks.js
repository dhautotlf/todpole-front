import { createActions } from 'redux-actions';

export default createActions({
  GET_BOOKMARKS_START: () => {},
  GET_BOOKMARKS_SUCCESS: (bookmarks) => bookmarks,
  GET_BOOKMARKS_ERROR: (error) => error,
  CREATE_BOOKMARKS_START: () => {},
  CREATE_BOOKMARKS_SUCCESS: (bookmark) => bookmark,
  CREATE_BOOKMARKS_ERROR: (error) => error,
});
