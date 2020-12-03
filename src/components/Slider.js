import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import PropTypes from 'prop-types';
import SliderLabel from '../components/SliderLabel';

const SliderWrapper = styled.View`
  margin-top: ${({ theme }) => theme.spacing.small}px;
  margin-bottom: -${({ theme }) => theme.spacing.small}px;
  align-items: center;
`;

const SliderThumbWrapper = styled.View`
  height: 50px;
  width: 25px;
  margin-top: -35px;
  align-items: center;
`;

const SliderDot = styled.View`
  position: absolute;
  height: 8px;
  width: 8px;
  bottom: 3px;
  border-radius: 4px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.mediumGray};
`;

const SliderThumb = () => (
  <SliderThumbWrapper>
    <SliderDot />
  </SliderThumbWrapper>
);

const Slider = (props) => {
  const themeContext = useContext(ThemeContext);
  return (
    <SliderWrapper>
      <MultiSlider
        {...props}
        isMarkersSeparated={true}
        enableLabel
        trackStyle={{
          height: 2,
          backgroundColor: 'rgba(196, 196, 196, 0.38)',
        }}
        selectedStyle={{
          backgroundColor: themeContext.colors.mediumGray,
        }}
        customMarkerRight={SliderThumb}
        customMarkerLeft={SliderThumb}
        customLabel={SliderLabel}
        sliderLength={
          Dimensions.get('window').width - 2 * themeContext.spacing.large
        }
        snapped
      />
    </SliderWrapper>
  );
};

Slider.propTypes = {
  fields: PropTypes.object,
  onFieldChange: PropTypes.func,
  context: PropTypes.string,
};

Slider.defaultProps = {
  fields: {},
  onFieldChange: () => {},
  context: 'activityCreation',
};

export default Slider;
