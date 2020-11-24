import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const StyledRoundButton = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.yellowOpacity}
  width: 54px;
  height: 54px;
  justify-content: center;
  align-items: center;
  border-radius: 27px;
`;

const StyledSmallRoundButton = styled(StyledRoundButton)`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

const StyledMediumRoundButton = styled(StyledRoundButton)`
  width: 38px;
  height: 38px;
  border-radius: 19px;
`;

const iconParams = {
  height: '50%',
  width: '50%',
};

const StyledIcon = (Icon) => styled(Icon).attrs(() => iconParams)``;

function RoundButton({
  style,
  selected,
  small,
  medium,
  Icon,
  IconSelected = Icon,
  onPress,
}) {
  let Container = StyledRoundButton;
  if (small) Container = StyledSmallRoundButton;
  if (medium) Container = StyledMediumRoundButton;
  const Asset = selected ? StyledIcon(IconSelected) : StyledIcon(Icon);

  return (
    <Container style={style} onPress={onPress}>
      <Asset />
    </Container>
  );
}

RoundButton.propTypes = {
  style: PropTypes.any,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  selected: PropTypes.bool,
  Icon: PropTypes.object,
  IconSelected: PropTypes.any,
  onPress: PropTypes.func,
};

RoundButton.defaultProps = {
  small: false,
  medium: false,
  selected: false,
  Icon: null,
  IconSelected: null,
  onPress: () => {},
};

RoundButton.StyledRoundButton = StyledRoundButton;

export default RoundButton;
