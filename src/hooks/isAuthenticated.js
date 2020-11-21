import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated, restoreSession } from '../reducers/session';

export default function () {
  const dispatch = useDispatch();
  const auth = useSelector(isAuthenticated);
  useEffect(() => {
    if (!auth.isAuthenticated) dispatch(restoreSession());
  }, []);

  return auth;
}
