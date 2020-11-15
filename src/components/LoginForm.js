import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import PropTypes from 'prop-types';
import BasicButton from '../components/BasicButton';
import { translations } from '../constants/translations';

const Form = styled.View`
  flex: 1;
`;

const FieldView = styled.View`
  margin-bottom: 15px;
`;

const Label = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.black};
`;

const StyledTextInput = styled.TextInput`
  padding: 10px;
  width: 320px;
  height: 44px;
  border: 1px solid ${(props) => props.theme.colors.darkGray};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.black};
`;

const Footer = styled.View`
  align-items: center;
`;

function LoginForm({ submitButtonLabel, onLogin }) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const themeContext = useContext(ThemeContext);

  const submitForm = () => {
    const user = {
      login: email,
      password,
    };
    onLogin(user);
  };

  return (
    <Form>
      <FieldView>
        <Label>{translations.signup_option_title1}:</Label>
        <StyledTextInput
          name="email"
          type="email"
          value={'email@email.com'}
          placeholder={translations.signup_option_text1}
          placeholderTextColor={themeContext.colors.silver}
          onChangeText={onChangeEmail}
          required
        />
      </FieldView>
      <FieldView>
        <Label>{translations.signup_option_title2}:</Label>
        <StyledTextInput
          name="password"
          type="password"
          value={'password'}
          placeholder={translations.signup_option_text2}
          placeholderTextColor={themeContext.colors.silver}
          onChangeText={onChangePassword}
          textContentType={'oneTimeCode'}
          secureTextEntry
          required
        />
      </FieldView>
      <Footer>
        <BasicButton label={submitButtonLabel} onPress={submitForm} />
      </Footer>
    </Form>
  );
}

LoginForm.propTypes = {
  label: PropTypes.string,
  onLogin: PropTypes.func,
  submitButtonLabel: PropTypes.string,
};

LoginForm.defaultProps = {
  label: 'Default Category',
  onLogin: () => {},
};

export default LoginForm;
