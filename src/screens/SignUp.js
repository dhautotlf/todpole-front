import React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { register } from '../reducers/session';
import { getSession } from '../hooks';
import styled from 'styled-components/native';
import LoginForm from '../components/LoginForm';
import { translations } from '../constants/translations';

const ScreenWrapper = styled.View`
  display: flex;
  flex: 1;
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

function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const { errorMessage /* isLoading*/ } = getSession();

  const signUp = (user) => {
    dispatch(register(user));
  };

  return (
    <ScreenWrapper>
      <Text onPress={() => navigation.navigate('SignIn')}>Go to SignIn</Text>
      <Text
        onPress={() => navigation.navigate('HomeTab', { screen: 'Settings' })}
      >
        Go to Discover
      </Text>
      <Header>
        <Description>{translations.signup_header_text}</Description>
      </Header>
      <Body>
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        <LoginForm
          onLogin={signUp}
          submitButtonLabel={translations.signup_footer_button}
        />
      </Body>
    </ScreenWrapper>
  );
}

SignUp.propTypes = {};

SignUp.defaultProps = {};

export default SignUp;
