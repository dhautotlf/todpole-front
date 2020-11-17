import React from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const ActivityReviewWrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-right: 10px;
  margin-bottom: 23px;
`;

function ActivityReview({ review }) {
  return (
    <ActivityReviewWrapper>
      <Text>{review}</Text>
    </ActivityReviewWrapper>
  );
}

ActivityReview.propTypes = {
  review: PropTypes.string,
};

ActivityReview.defaultProps = {
  review: 'Default Review',
};

export default ActivityReview;
