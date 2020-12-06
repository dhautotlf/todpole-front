import React, { useState, useContext, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import PropTypes from 'prop-types';
import BasicButton from '../components/BasicButton';
import AlertIcon from '../assets/icons/alert.svg';
import { translations } from '../constants/translations';

const Form = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

const FieldsContainer = styled.View`
  flex: 1;
  justify-content: center;
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
  border: 1px solid
    ${(props) =>
      props.hasError
        ? props.theme.colors.redError
        : props.theme.colors.darkGray};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.black};
`;

const ErrorWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.theme.colors.redErrorBg};
  padding: 6px 40px 6px 16px;
  border-radius: 8px;
`;

const ErrorMessage = styled.Text`
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  text-align: left;
  color: ${(props) => props.theme.colors.redError};
  margin-left: ${(props) => props.theme.spacing.tiny}px;
`;

const Footer = styled.View`
  align-items: center;
  margin-top: auto;
  margin-bottom: 45px;
`;

const EMAIL_VALIDATION_ERROR = translations.signup_validation_error_email;
const NAME_VALIDATION_ERROR = translations.signup_validation_error_name;
const PASSWORD_VALIDATION_ERROR = translations.signup_validation_error_password;

function LoginForm({ submitButtonLabel, onLogin, loading }) {
  const [email, setEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [name, onChangeName] = useState('');
  const [error, setError] = useState(null);
  const themeContext = useContext(ThemeContext);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const submitForm = () => {
    if (!validateEmail(email)) {
      setError(EMAIL_VALIDATION_ERROR);
    } else if (!name) {
      setError(NAME_VALIDATION_ERROR);
    } else if (!password) {
      setError(PASSWORD_VALIDATION_ERROR);
    } else {
      const user = {
        login: email,
        password,
      };
      onLogin(user);
    }
  };

  const onChangeEmail = (email) => {
    setEmail(email);
    if (email === '') {
      setError(null);
    }
  };

  return (
    <Form>
      <FieldsContainer>
        <FieldView>
          <Label>{translations.signup_option_title0}:</Label>
          <StyledTextInput
            name="name"
            value={name}
            placeholder={translations.signup_option_text0}
            placeholderTextColor={themeContext.colors.silver}
            onChangeText={onChangeName}
            autoCapitalize="none"
            keyboardType="default"
            required
            hasError={error === NAME_VALIDATION_ERROR}
          />
          {error === NAME_VALIDATION_ERROR && (
            <ErrorWrapper>
              <AlertIcon
                width={16}
                height={16}
                color={themeContext.colors.redError}
              />
              <ErrorMessage>{error}</ErrorMessage>
            </ErrorWrapper>
          )}
        </FieldView>
        <FieldView>
          <Label>{translations.signup_option_title1}:</Label>
          <StyledTextInput
            name="email"
            type="email"
            value={email}
            placeholder={translations.signup_option_text1}
            placeholderTextColor={themeContext.colors.silver}
            onChangeText={onChangeEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            required
            hasError={error === EMAIL_VALIDATION_ERROR}
          />
          {error === EMAIL_VALIDATION_ERROR && (
            <ErrorWrapper>
              <AlertIcon
                width={16}
                height={16}
                color={themeContext.colors.redError}
              />
              <ErrorMessage>{error}</ErrorMessage>
            </ErrorWrapper>
          )}
        </FieldView>
        <FieldView>
          <Label>{translations.signup_option_title2}:</Label>
          <StyledTextInput
            name="password"
            type="password"
            value={password}
            placeholder={translations.signup_option_text2}
            placeholderTextColor={themeContext.colors.silver}
            onChangeText={onChangePassword}
            textContentType={'oneTimeCode'}
            autoCapitalize="none"
            secureTextEntry
            required
          />
          {error === PASSWORD_VALIDATION_ERROR && (
            <ErrorWrapper>
              <AlertIcon
                width={16}
                height={16}
                color={themeContext.colors.redError}
              />
              <ErrorMessage>{error}</ErrorMessage>
            </ErrorWrapper>
          )}
        </FieldView>
      </FieldsContainer>
      <Footer>
        <BasicButton
          label={submitButtonLabel}
          onPress={submitForm}
          selected
          loading={loading}
        />
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
