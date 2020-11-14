import { useSelector } from 'react-redux';
import { getSession } from '../reducers/session';

export default function () {
  return useSelector(getSession);
}
