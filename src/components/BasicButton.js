import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const StyledButton = styled.TouchableOpacity`
  max-width: 160px;
  border-radius: 8px;
  padding: 10px 30px;
  margin-bottom: 15px;
  background: ${(props) =>
    props.selected ? props.theme.colors.green : props.theme.colors.lightGray};
`;

const Label = styled.Text`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${(props) =>
    props.selected ? props.theme.colors.white : props.theme.colors.green};
`;

function BasicButton({ label, onPress, selected }) {
  return (
    <StyledButton onPress={onPress} selected={selected}>
      <Label selected={selected}>{label}</Label>
    </StyledButton>
  );
}

BasicButton.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
};

BasicButton.defaultProps = {
  label: 'Default Category',
  selected: false,
};

BasicButton.StyledButton = StyledButton;

export default BasicButton;
