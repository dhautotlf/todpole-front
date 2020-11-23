import React from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import StarRating from '../components/StarRating';
import PropTypes from 'prop-types';
import { translations } from '../constants/translations';

const ActivityReviewWrapper = styled.View`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  margin-top: 5px;
  margin-bottom: 20px;
`;

function ActivityReview({ reviewList }) {
  return reviewList.map(r => (
  <ActivityReviewWrapper>
      <StarRating ratingObj={r} hideViews />
      <Label>
        {r.text}
      </Label>
    </ActivityReviewWrapper>
    )
    )
}

ActivityReview.propTypes = {};

ActivityReview.defaultProps = {
  review: {
    ratings: 0,
    views: 0,
  },
};

export default ActivityReview;
