import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Text, View } from 'react-native';
import StarFillIcon from '../assets/icons/star_fill.svg';
import StarUnfillIcon from '../assets/icons/star.svg';
import PropTypes from 'prop-types';

const StarsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledStarFillIcon = styled(StarFillIcon)`
  margin-right: 4px;
`;
const StyledStarUnfillIcon = styled(StarUnfillIcon)`
  margin-right: 4px;
`;

function StarRating({ ratingObj, hideViews }) {
  const themeContext = useContext(ThemeContext);

  let stars = [];
  for (var i = 1; i <= 5; i++) {
    let icon = <StyledStarFillIcon key={`fill_${i}`} width={18} height={18} fill={themeContext.colors.yellow} />;
    if (i > ratingObj.rating) {
      icon = (
        <StyledStarUnfillIcon
          key={`unfill_${i}`}
          width={18}
          height={18}
          fill={themeContext.colors.yellow}
        />
      );
    }
    stars.push(icon);
  }

  return (
    <StarsContainer>
      {stars}
      {!hideViews && <Text>({ratingObj.views})</Text>}
    </StarsContainer>
  );
}

StarRating.propTypes = {
  ratingObj: PropTypes.shape({
    ratings: PropTypes.number,
    views: PropTypes.number,
  }),
  hideViews: PropTypes.bool,
};

StarRating.defaultProps = {
  ratingObj: {
    ratings: 0,
    views: 0,
  },
  hideViews: false,
};

export default StarRating;
