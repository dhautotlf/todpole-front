import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const StyledButton = styled.TouchableOpacity`
  max-width: 160px;
  border-radius: 8px;
  padding: 10px 30px;
  background: ${(props) => props.theme.colors.green};
  margin-bottom: 15px;
`;

const Label = styled.Text`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${(props) => props.theme.colors.white};
`;

function BasicButton({ label, onPress }) {
  return (
    <StyledButton onPress={onPress}>
      <Label>{label}</Label>
    </StyledButton>
  );
}

BasicButton.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
};

BasicButton.defaultProps = {
  label: 'Default Category',
};

export default BasicButton;
