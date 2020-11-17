import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActivity, fetchActivity } from '../reducers/activities';

export default function (id) {
  const dispatch = useDispatch();
  const activity = useSelector((state) => getActivity(state, id));
  useEffect(() => {
    dispatch(fetchActivity(id));
  }, [dispatch]);

  return activity;
}
