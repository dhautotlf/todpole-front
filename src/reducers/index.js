import { combineReducers } from 'redux';
import user from './user';
import session from './session';
import activities from './activities';
import bookmarks from './bookmarks';

export default combineReducers({
  activities,
  bookmarks,
  session,
  user,
});
