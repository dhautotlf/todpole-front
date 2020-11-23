import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import PropTypes from 'prop-types';
import TimerIcon from '../assets/icons/timer.svg';
import StarIcon from '../assets/icons/star.svg';
import CategoryIcon from '../assets/icons/category.svg';

const ActivitySummaryWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: ${Dimensions.get('window').width * 80/100};
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  background: ${(props) => props.theme.colors.white};
  margin: -40px 10px 25px 10px;
`;

const ActivityTitleWrapper = styled.View`
  border-bottom-width: 1px;
  border-style: solid;
  border-bottom-color: ${(props) => props.theme.colors.anotherGray};
`;

const ActivityTitle = styled.Text`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: ${(props) => props.theme.colors.black};
  padding: 10px;
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

const CategoryText = styled(DurationText)`
  flex-wrap: wrap;
`;

const ActivityRating = styled(ActivityDuration)``;

const RatingTextWrapper = styled(DurationTextWrapper)``;

const RatingText = styled(DurationText)`
  text-transform: capitalize;
  padding: ${(props) => props.theme.spacing.small}px 0px;
`;

function ActivitySummary({ name, category, duration, averageRating }) {
  const themeContext = useContext(ThemeContext);

  return (
    <ActivitySummaryWrapper>
      <ActivityTitleWrapper>
        <ActivityTitle>{name}</ActivityTitle>
      </ActivityTitleWrapper>
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
          <StarIcon fill={themeContext.colors.yellow} width={22} height={21} />
          <RatingTextWrapper>
            <RatingText>{averageRating}</RatingText>
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
