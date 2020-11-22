import React from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import StarRating from '../components/StarRating';
import PropTypes from 'prop-types';
import { translations } from '../constants/translations';

const ActivityReviewWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
`;

function ActivityReview({ review }) {
  return (
    <ActivityReviewWrapper>
      <Label>
        {translations.activitydetail_topic_title4}({review.views})
      </Label>
      <StarRating ratingObj={review} hideViews />
    </ActivityReviewWrapper>
  );
}

ActivityReview.propTypes = {};

ActivityReview.defaultProps = {
  review: {
    ratings: 0,
    views: 0,
  },
};

export default ActivityReview;
