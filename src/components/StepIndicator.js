import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 40px;
  height: 40px;
  justify-content: center;
`;

const Dot = styled.View`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  margin-horizontal: 5px;
  background: ${({ theme: { colors }, isSelected }) =>
    isSelected ? colors.mediumGray : colors.anotherGray}}
`;

function StepIndicator({ count, selectedIndex }) {
  return (
    <Wrapper>
      {Array(count)
        .fill()
        .map((_, index) => (
          <Dot
            key={`${index}-${selectedIndex}`}
            isSelected={index === selectedIndex}
          />
        ))}
    </Wrapper>
  );
}

StepIndicator.propTypes = {
  count: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

StepIndicator.defaultProps = { displayName: 'StepIndicator' };

export default StepIndicator;
