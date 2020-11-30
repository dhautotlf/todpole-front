import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActivity } from '../reducers/activities';
import { didUserReviewActivity } from '../utils/selectors';

export default function (id) {
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activities.data[id]);

  const canReviewActivity = useMemo(() => {
    let result;
    return (user) => {
      const userId = user ? user.id : null;
      result = didUserReviewActivity(id, userId);
      return result;
    };
  }, [activity]);

  useEffect(() => {
    dispatch(fetchActivity(id));
  }, [dispatch]);

  return useMemo(
    () => ({
      ...activity,
      canReviewActivity,
    }),
    [activity, canReviewActivity],
  );
}
