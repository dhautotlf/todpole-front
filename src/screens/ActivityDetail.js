import React, { useContext } from 'react';
import { SafeAreaView, View } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import PropTypes from 'prop-types';
import { getActivity } from '../hooks';
import { translations } from '../constants/translations';
import ActivitySummary from '../components/ActivitySummary';
import ActivityDetails from '../components/ActivityDetails';
import BookmarkButton from '../components/BookmarkButton';
import StarIcon from '../assets/icons/star.svg';

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
  aspect-ratio: 1;
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

const AddReviewButton = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.green70};
  position: absolute;
  bottom: 21px;
  right: 47px;
  width: 54px;
  height: 54px;
  border-radius: 54px;
  justify-content: center;
  align-items: center;
`;

const ActivityImageWithButton = (props) => (
  <View style={{ flex: 1, marginHorizontal: 30 }}>
    <ActivityImage {...props} />
    <BookmarkButtonContainer>
      <BookmarkButton activity={props.activity} />
    </BookmarkButtonContainer>
  </View>
);

function ActivityDetail({ route }) {
  const { id, url } = route.params;
  const themeContext = useContext(ThemeContext);

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
            username={activityData.user.name}
          />
          <ActivityDetails activityData={activityData} />
        </Body>
      </ScreenWrapper>
      <AddReviewButton>
        <StarIcon width={25} height={30} color={themeContext.colors.white} />
      </AddReviewButton>
    </StyledSafeAreaView>
  );
}

ActivityDetail.propTypes = {
  route: PropTypes.any,
};

ActivityDetail.defaultProps = {};

export default ActivityDetail;
