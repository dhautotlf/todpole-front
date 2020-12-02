import { combineReducers } from 'redux';
import user from './user';
import session from './session';
import activities from './activities';
import bookmarks from './bookmarks';
import materials from './materials';

export default combineReducers({
  activities,
  bookmarks,
  materials,
  session,
  user,
});
