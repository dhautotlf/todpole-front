import React, { useState, useContext } from 'react';
import { Button, Picker, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import PropTypes from 'prop-types';
import {translations} from '../constants/translations';

const Form = styled.View``;

const FieldView = styled.View`
  margin-bottom: 15px;
`;

const Label = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.black};
`;

const StyledTextInput = styled.TextInput`
  padding: 10px;
  width: 320px;
  height: 44px;
  border: 1px solid ${props => props.theme.colors.darkGray};
  border-radius: 8px;
  color: ${props => props.theme.colors.black};

`;

function LoginForm({label, onPress}) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const themeContext = useContext(ThemeContext);

  return (
    <Form>
      <FieldView>
        <Label>{translations.signup_option_title1}:</Label>
        <StyledTextInput
          name="email"
          type="email"
          value={email}
          placeholder={translations.signup_option_text1}
          placeholderTextColor={themeContext.colors.silver}
          onChange={e => onChangeEmail(e.target.value)}
          required />
      </FieldView>
      <FieldView>
        <Label>{translations.signup_option_title2}:</Label>
        <StyledTextInput
          name="password"
          type="password"
          value={password}
          placeholder={translations.signup_option_text2}
          placeholderTextColor={themeContext.colors.silver}
          onChange={e => onChangePassword(e.target.value)}
          required
          secureTextEntry />
      </FieldView>
    </Form>
  );
}

LoginForm.propTypes = {
  label: PropTypes.string
};

LoginForm.defaultProps = {
  label: "Default Category"
};

export default LoginForm;
