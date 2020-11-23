import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { getActivity } from '../hooks';
import { translations } from '../constants/translations';
import ActivitySummary from '../components/ActivitySummary';
import ActivityDetails from '../components/ActivityDetails';
import BookmarkButton from '../components/BookmarkButton';

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;

const ScreenWrapper = styled.ScrollView.attrs((props) => ({
  contentContainerStyle: {
    paddingTop: props.theme.spacing.large,
    paddingBottom: props.theme.spacing.small,
  },
}))`
  background: ${(props) => props.theme.colors.white};
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing.tiny}px;
`;

const AgeDetails = styled.View`
  width: 136px;
  height: 37px;
  position: absolute;
  z-index: 2;
  left: 0px;
  top: 22px;
  background: ${(props) => props.theme.colors.yellow};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 10px;
`;

const AgeText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.colors.white};
`;

const ActivityImage = styled.Image`
  width: 316px;
  height: 316px;
  border-radius: 8px;
`;

const Body = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

const BookmarkButtonContainer = styled(View)`
  position: absolute;
  bottom: 55px;
  right: 18px;
`;

const ActivityImageWithButton = (props) => (
  <View>
    <ActivityImage {...props} />
    <BookmarkButtonContainer>
      <BookmarkButton activity={props.activity} />
    </BookmarkButtonContainer>
  </View>
);

function ActivityDetail({ route }) {
  const { id, url } = route.params;

  const activityData = getActivity(id);

  const { activityImageList } = activityData;

  const mainImage =
    activityImageList && activityImageList.find(({ isMain }) => isMain);

  const activityUrl = url || (!!mainImage && mainImage.url) || null;

  return (
    <StyledSafeAreaView>
      <ScreenWrapper>
        <Header>
          <AgeDetails>
            <AgeText>{`${activityData.ageMin} - ${activityData.ageMax} ${translations.activitydetail_topic_age}`}</AgeText>
          </AgeDetails>
          <ActivityImageWithButton
            activity={activityData}
            source={{
              uri: activityUrl,
            }}
          />
        </Header>
        <Body>
          <ActivitySummary
            name={activityData.name}
            category={activityData.category}
            duration={activityData.timing}
            averageRating={activityData.averageRating}
          />
          <ActivityDetails activityData={activityData} />
        </Body>
      </ScreenWrapper>
    </StyledSafeAreaView>
  );
}

ActivityDetail.propTypes = {
  route: PropTypes.any,
};

ActivityDetail.defaultProps = {};

export default ActivityDetail;
