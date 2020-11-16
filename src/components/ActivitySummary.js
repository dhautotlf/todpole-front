import React from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import TimerIcon from '../assets/icons/timer.svg';
import StarIcon from '../assets/icons/star.svg';
import CategoryIcon from '../assets/icons/category.svg';

const ActivitySummaryWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-right: 10px;
  margin-bottom: 23px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  background: ${(props) => props.theme.colors.white};
  position: absolute;
  top: -20px;
`;

const ActivityTitle = styled.Text`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: ${(props) => props.theme.colors.black};
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.anotherGray};
`;

const ActivityDetails = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 12px 0px;
`;

const ActivityDuration = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const ActivityCategory = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const ActivityRating = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

function ActivitySummary({ name, category, duration, rating }) {
  return (
    <ActivitySummaryWrapper>
      <ActivityTitle>{name}</ActivityTitle>
      <ActivityDetails>
        <ActivityDuration>
          <TimerIcon />
          <Text>{duration}</Text>
        </ActivityDuration>
        <ActivityCategory>
          <CategoryIcon />
          <Text>{category}</Text>
        </ActivityCategory>
        <ActivityRating>
          <StarIcon />
          <Text>{rating}</Text>
        </ActivityRating>
      </ActivityDetails>
    </ActivitySummaryWrapper>
  );
}

ActivitySummary.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  duration: PropTypes.number,
  rating: PropTypes.number,
};

ActivitySummary.defaultProps = {
  name: 'default activity name',
  category: 'default activity category',
  duration: 0,
  rating: 0,
};

export default ActivitySummary;
