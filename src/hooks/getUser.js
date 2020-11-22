import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, fetchUser } from '../reducers/user';

export default function () {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  useEffect(() => {
    if (!user.isLoading && !user.data) dispatch(fetchUser());
  });

  return user;
}
