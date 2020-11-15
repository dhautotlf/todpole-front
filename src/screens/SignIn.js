import React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { authenticate } from '../reducers/session';
import { getSession } from '../hooks';
import styled from 'styled-components/native';
import LoginForm from '../components/LoginForm';
import { translations } from '../constants/translations';

const ScreenWrapper = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: ${(props) => props.theme.colors.white};
`;

const Header = styled.View`
  flex-direction: column;
  align-items: center;
`;

const Description = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  margin-top: 25px;
`;

const Body = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 44px;
`;

function SignIn() {
  const dispatch = useDispatch();
  const { errorMessage } = getSession();

  const signIn = (credentials) => {
    dispatch(authenticate(credentials));
  };

  return (
    <ScreenWrapper>
      <Header>
        <Text onPress={signIn}>Test Login</Text>
        <Description>{translations.signin_header_text}</Description>
      </Header>
      <Body>
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        <LoginForm
          onLogin={signIn}
          submitButtonLabel={translations.signin_footer_button}
        />
      </Body>
    </ScreenWrapper>
  );
}

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default SignIn;
