import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import BookmarkIcon from '../assets/icons/bookmark.svg';
import BookmarkedIcon from '../assets/icons/bookmarked.svg';
import { postBookmark } from '../reducers/bookmarks';
import { isActivityBookmarked } from '../hooks';

const StyledBookmarkButton = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.yellowOpacity}
  width: 54px;
  height: 54px;
  justify-content: center;
  align-items: center;
  border-radius: 27px;
`;

const Bookmark = styled(BookmarkIcon).attrs(() => ({
  width: 25,
  height: 31,
  color: 'white',
}))``;

const Bookmarked = styled(BookmarkedIcon).attrs(() => ({
  width: 25,
  height: 31,
  color: 'white',
}))``;

function BookmarkButton({ activity }) {
  const dispatch = useDispatch();

  const selected = isActivityBookmarked(activity);

  const createBookmark = async (activity) => {
    await dispatch(postBookmark(activity));
  };

  return (
    <StyledBookmarkButton onPress={() => createBookmark(activity)}>
      {selected ? <Bookmarked /> : <Bookmark />}
    </StyledBookmarkButton>
  );
}

BookmarkButton.propTypes = {
  activity: PropTypes.object,
};

BookmarkButton.defaultProps = {};

BookmarkButton.StyledBookmarkButton = StyledBookmarkButton;

export default BookmarkButton;
