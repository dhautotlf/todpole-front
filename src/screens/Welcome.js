import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Category from '../components/Category';
import SignUpButton from '../components/SignUpButton';
import {translations} from '../constants/translations';

const ScreenWrapper = styled.View`
  display: flex;
  flex: 1;
`;

const Header = styled.View`
  flex-direction: column;
  align-items: center;
`;

const Title = styled.Text`
  text-align: center;
  font-weight: normal;
  font-size: 36px;
  line-height: 43px;
  margin-top: 44px;
`;

const Description = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  margin: 25px 80px 37px 80px;
`;

const CategoriesWrapper = styled.View`
  flex: 1;
  margin: 0px ${props => props.theme.spacing.large}px 50px ${props => props.theme.spacing.large}px;
`;

const Footer = styled.View`
  align-items: center;
`;

const LoginText = styled.Text`
  margin-bottom: 26px;
  color: ${props => props.theme.colors.mediumGray};
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
`;

function Welcome({ navigation }) {
  const listCategories = translations.welcome_categories.map((category,index) =>
    <Category key={index} title={category.title} description={category.text}/>
  );
  return (
    <ScreenWrapper>
      <Header>
        <Title>{translations.welcome_header_title}</Title>
        <Description>{translations.welcome_header_text}</Description>
      </Header>
      <CategoriesWrapper>
      {listCategories}
      </CategoriesWrapper>
      <Footer>
        <SignUpButton label={translations.welcome_footer_button1} onPress={() => navigation.navigate('CreateToddler')}/>
        <LoginText>{translations.welcome_footer_button2}</LoginText>
      </Footer>
    </ScreenWrapper>
  );
}

Welcome.propTypes = {
  displayName: PropTypes.string,
};

Welcome.defaultProps = {
  displayName: 'Welcome to Jamrock',
};

export default Welcome;