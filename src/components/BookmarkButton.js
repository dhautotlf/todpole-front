import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import BookmarkIcon from '../assets/icons/bookmark.svg';
import BookmarkedIcon from '../assets/icons/bookmarked.svg';
import { postBookmark, deleteBookmark } from '../reducers/bookmarks';
import { isActivityBookmarked } from '../hooks';

const StyledBookmarkButton = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.yellowOpacity}
  width: 54px;
  height: 54px;
  justify-content: center;
  align-items: center;
  border-radius: 27px;
`;

const StyledSmallBookmarkButton = styled(StyledBookmarkButton)`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

const iconParams = {
  height: '50%',
  width: '50%',
  color: 'white',
};
const Bookmark = styled(BookmarkIcon).attrs(() => iconParams)``;
const Bookmarked = styled(BookmarkedIcon).attrs(() => iconParams)``;

function BookmarkButton({ activity, small }) {
  const dispatch = useDispatch();
  const selected = isActivityBookmarked(activity);

  const createBookmark = async (activity) =>
    await dispatch(postBookmark(activity));

  const unBookmark = async (activity) =>
    await dispatch(deleteBookmark(activity));

  const Container = small ? StyledSmallBookmarkButton : StyledBookmarkButton;
  const Icon = selected ? Bookmarked : Bookmark;

  return (
    <Container
      small={small}
      onPress={() => (selected ? unBookmark : createBookmark)(activity)}
    >
      <Icon />
    </Container>
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
