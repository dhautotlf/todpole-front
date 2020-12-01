import { useSelector } from 'react-redux';

export const didUserReviewActivity = (id, userId) => {
  const activities = useSelector((state) => state.activities);
  if (!userId) return false;
  const test = activities.data[id].reviewList.some(
    (review) => review.userId === userId,
  );
  return !activities.data[id].reviewList.some(
    (review) => review.userId === userId,
  );
};
