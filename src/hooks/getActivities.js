import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActivities, fetchActivities } from '../reducers/activities';

export default function () {
  const dispatch = useDispatch();
  //debugger;
  const activities = useSelector(getActivities);
  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  return activities;
}
