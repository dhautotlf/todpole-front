import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActivities, fetchActivities } from '../reducers/activities';

export default function () {
  const dispatch = useDispatch();
  const activities = useSelector(getActivities);
  useEffect(() => {
    if (!activities.isLoading && !activities.data) dispatch(fetchActivities());
  }, [dispatch]);

  return activities;
}
