import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  isBookmarked,
  getBookmarks,
  fetchBookmarks,
} from '../reducers/bookmarks';

export default function (activity) {
  const dispatch = useDispatch();
  const isActivityBookmarked = useSelector((state) =>
    isBookmarked(state, activity),
  );
  const { isLoading, data } = useSelector(getBookmarks);
  useEffect(() => {
    if (!isLoading && !data) dispatch(fetchBookmarks());
  }, [dispatch]);
  return isActivityBookmarked;
}
