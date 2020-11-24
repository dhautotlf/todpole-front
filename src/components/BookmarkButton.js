import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import RoundButton from './RoundButton';
import BookmarkedIcon from '../assets/icons/bookmarked.svg';
import BookmarkIcon from '../assets/icons/bookmark.svg';
import { postBookmark, deleteBookmark } from '../reducers/bookmarks';
import { isActivityBookmarked } from '../hooks';

const StyledBookmarkButton = styled(RoundButton)`
  background: ${(props) => props.theme.colors.yellowOpacity};
`;

const Bookmark = styled(BookmarkIcon).attrs(({ theme }) => ({
  color: theme.colors.white,
}))``;

const Bookmarked = styled(BookmarkedIcon).attrs(({ theme }) => ({
  color: theme.colors.white,
}))``;

function BookmarkButton({ activity, small }) {
  const dispatch = useDispatch();
  const selected = isActivityBookmarked(activity);

  const createBookmark = async (activity) =>
    await dispatch(postBookmark(activity));

  const unBookmark = async (activity) =>
    await dispatch(deleteBookmark(activity));

  return (
    <StyledBookmarkButton
      selected={selected}
      Icon={Bookmark}
      IconSelected={Bookmarked}
      small={small}
      onPress={() => (selected ? unBookmark : createBookmark)(activity)}
    />
  );
}

BookmarkButton.propTypes = {
  activity: PropTypes.object,
  small: PropTypes.bool,
};

BookmarkButton.defaultProps = {
  small: false,
};

BookmarkButton.StyledBookmarkButton = StyledBookmarkButton;

export default BookmarkButton;
