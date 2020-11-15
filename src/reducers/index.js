import { combineReducers } from 'redux';
import user from './user';
import session from './session';
import activities from './activities';

export default combineReducers({
  activities,
  session,
  user,
});
