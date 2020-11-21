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
  width: ${({ small }) => (small ? '30px' : '54px')};
  height: ${({ small }) => (small ? '30px' : '54px')};
  justify-content: center;
  align-items: center;
  border-radius: ${({ small }) => (small ? '15px' : '27px')};
`;

const Bookmark = styled(BookmarkIcon).attrs(() => ({
  height: '50%',
  width: '50%',
  color: 'white',
}))``;

const Bookmarked = styled(BookmarkedIcon).attrs(() => ({
  height: '50%',
  width: '50%',
  color: 'white',
}))``;

function BookmarkButton({ activity, small }) {
  const dispatch = useDispatch();

  const selected = isActivityBookmarked(activity);

  const createBookmark = async (activity) => {
    await dispatch(postBookmark(activity));
  };

  return (
    <StyledBookmarkButton
      small={small}
      onPress={() => createBookmark(activity)}
    >
      {selected ? <Bookmarked /> : <Bookmark />}
    </StyledBookmarkButton>
  );
}

BookmarkButton.propTypes = {
  activity: PropTypes.object,
  small: PropTypes.boolean,
};

BookmarkButton.defaultProps = {
  small: false,
};

BookmarkButton.StyledBookmarkButton = StyledBookmarkButton;

export default BookmarkButton;
