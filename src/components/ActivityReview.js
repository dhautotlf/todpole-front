import React from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';
import StarRating from '../components/StarRating';
import PropTypes from 'prop-types';
import { translations } from '../constants/translations';

const ActivityReviewWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Label = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  padding-bottom: 13px;
`;

const ReviewsContainer = styled.View`
  flex: 1;
  border-top-width: 0.5px;
  border-style: solid;
  border-top-color: ${(props) => props.theme.colors.silver};
`;

const ReviewContainer = styled.View`
  flex-direction: column;
  margin-top: 11px;
`;

const UserName = styled.Text`
  font-style: italic;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 6px;
`;

const ReviewDate = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
`;

const ReviewText = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  margin-top: 6px;
`;

function ActivityReview({ reviewList }) {
  const renderReview = (review) => {
    const { userId, rating, text } = review;
    const fakeDate = 'Nov 23, 2020';
    const ratingObj = { ratings: rating, view: null };
    return (
      <ReviewContainer key={`review-${userId}`}>
        <UserName>{userId}</UserName>
        <RatingContainer>
          <StarRating ratingObj={ratingObj} hideViews />
          <ReviewDate>{fakeDate}</ReviewDate>
        </RatingContainer>
        <ReviewText>{text}</ReviewText>
      </ReviewContainer>
    );
  };

  return (
    <ActivityReviewWrapper>
      <Label>
        {translations.activitydetail_topic_title4}({reviewList.length})
      </Label>
      <ReviewsContainer>
        {reviewList.map((review) => renderReview(review))}
      </ReviewsContainer>
    </ActivityReviewWrapper>
  );
}

ActivityReview.propTypes = {
  reviewList: PropTypes.array,
};

ActivityReview.defaultProps = {
  reviewList: [],
};

export default ActivityReview;
