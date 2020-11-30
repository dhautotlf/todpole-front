import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserActivities, fetchActivities } from '../reducers/activities';

export default function (user) {
  const dispatch = useDispatch();
  const activities = useSelector((state) => getUserActivities(state, user));
  // useEffect(() => {
  //   if (!activities.isLoading && !activities.data) dispatch(fetchActivities());
  // }, [dispatch]);

  return activities;
}
