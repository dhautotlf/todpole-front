import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import TimerIcon from '../assets/icons/timer.svg';
import StarIcon from '../assets/icons/star.svg';
import CategoryIcon from '../assets/icons/category.svg';

const ActivitySummaryWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 300px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  background: ${(props) => props.theme.colors.white};
  margin: -20px 10px 20px 0px;
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

const DurationTextWrapper = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const DurationText = styled.Text`
  text-transform: capitalize;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  padding: ${(props) => props.theme.spacing.small}px 0px;
`;

const ActivityCategory = styled(ActivityDuration)``;

const CategoryTextWrapper = styled(DurationTextWrapper)`
  flex: 1;
`;

const CategoryText = styled(DurationText)``;

const ActivityRating = styled(ActivityDuration)``;

const RatingTextWrapper = styled(DurationTextWrapper)``;

const RatingText = styled(DurationText)`
  text-transform: capitalize;
  padding: ${(props) => props.theme.spacing.small}px 0px;
`;

function ActivitySummary({ name, category, duration, rating }) {
  return (
    <ActivitySummaryWrapper>
      <ActivityTitle>{name}</ActivityTitle>
      <ActivityDetails>
        <ActivityDuration>
          <TimerIcon width={22} height={21} />
          <DurationTextWrapper>
            <DurationText>{`${duration} min`}</DurationText>
          </DurationTextWrapper>
        </ActivityDuration>
        <ActivityCategory>
          <CategoryIcon width={22} height={21} />
          <CategoryTextWrapper>
            <CategoryText>{category}</CategoryText>
          </CategoryTextWrapper>
        </ActivityCategory>
        <ActivityRating>
          <StarIcon width={22} height={21} />
          <RatingTextWrapper>
            <RatingText>{rating}</RatingText>
          </RatingTextWrapper>
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
