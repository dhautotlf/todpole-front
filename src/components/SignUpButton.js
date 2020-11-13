import React from 'react';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const StyledButton = styled.TouchableOpacity`
  max-width: 160px;
  border-radius: 8px;
  padding: 10px 30px;
  background: ${props => props.theme.colors.green};
  margin-bottom: 15px;
`;

const Label = styled.Text`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${props => props.theme.colors.white};
`;

function SignUpButton({label, onPress}) {
  return (
      <StyledButton onPress={onPress}>
        <Label>{label}</Label>
      </StyledButton>
  );
}

SignUpButton.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func
};

SignUpButton.defaultProps = {
  label: "Default Category"
};

export default SignUpButton;
