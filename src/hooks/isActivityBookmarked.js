import { useSelector } from 'react-redux';

import { isBookmarked } from '../reducers/bookmarks';

export default function (activity) {
  const isActivityBookmarked = useSelector((state) =>
    isBookmarked(state, activity),
  );
  return isActivityBookmarked;
}
