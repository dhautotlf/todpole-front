import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getBookmarkedActivities, fetchBookmarks } from '../reducers/bookmarks';

export default function () {
  const dispatch = useDispatch();
  const bookmarkedActivities = useSelector(getBookmarkedActivities);
  useEffect(() => {
    if (!bookmarkedActivities.data && !bookmarkedActivities.isLoading)
      dispatch(fetchBookmarks());
  }, [dispatch]);

  return bookmarkedActivities;
}
