import { useSelector } from 'react-redux';
import { isAuthenticated } from '../reducers/session';

export default function () {
  return useSelector(isAuthenticated);
}
