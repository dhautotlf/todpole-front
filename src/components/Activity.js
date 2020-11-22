import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import BookmarkButton from '../components/BookmarkButton';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const ActivityWrapper = styled.TouchableOpacity`
  flex: 1;
`;

const Caption = styled.View`
  border-radius: ${({ theme }) => theme.radius.small}px;
  padding-vertical: 12.5px
  padding-horizontal: ${({ theme }) => theme.spacing.tiny}px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  margin-top: -10px;
`;

const Title = styled.Text`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
`;

const ThumbnailImage = styled.Image`
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.radius.small}px;
`;

const BookmarkButtonContainer = styled.View`
  position: absolute;
  bottom: 46px;
  right: ${({ theme }) => theme.spacing.tiny}px;
`;

const isMain = ({ isMain }) => isMain;
const mainImageUri = (images) => ({ uri: get(images.find(isMain), 'url') });

const Activity = ({ id, activityImageList, name }) => {
  const { navigate } = useNavigation();
  const goToActivityPdp = () => {
    navigate('ActivityDetail', { id });
  };

  return (
    <ActivityWrapper onPress={goToActivityPdp}>
      <ThumbnailImage source={mainImageUri(activityImageList)} />
      <View>
        <BookmarkButtonContainer>
          <BookmarkButton small activity={{ id }} />
        </BookmarkButtonContainer>
        <Caption>
          <Title>{name}</Title>
        </Caption>
      </View>
    </ActivityWrapper>
  );
};

Activity.propTypes = {
  id: PropTypes.number.isRequired,
  activityImageList: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

Activity.defaultProps = {};

Activity.ActivityWrapper = ActivityWrapper;

export default Activity;
