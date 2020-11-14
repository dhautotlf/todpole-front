import React, { useState } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import BasicButton from '../components/BasicButton';
import LoginForm from '../components/LoginForm';
import {translations} from '../constants/translations';

const ScreenWrapper = styled.View`
  display: flex;
  flex: 1;
  background: ${props => props.theme.colors.white};
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


const Footer = styled.View`
  align-items: center;
`;

function SignIn({  }) {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <ScreenWrapper>
      <Header>
        <Description>{translations.signin_header_text}</Description>
      </Header>
      <Body>
        <LoginForm/>
      </Body>
      <Footer>
        <BasicButton label={translations.signin_footer_button} onPress={() => navigation.navigate('SignUp')}/>
        {errorMessage ? <Text>{errorMessage}</Text> : null}
      </Footer>
    </ScreenWrapper>
  );
}

SignIn.propTypes = {
};

SignIn.defaultProps = {
};

export default SignIn;
