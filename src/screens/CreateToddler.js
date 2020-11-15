import React from 'react';
import { Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import BasicButton from '../components/BasicButton';
import UserForm from '../components/UserForm';
import ImagePickerComponent from '../components/ImagePickerComponent';
import {translations} from '../constants/translations';

const ScreenWrapper = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'space-between'
    }
}))`
  background: ${props => props.theme.colors.white};
`;

const Header = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Description = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  margin: 25px 36px 0px 36px;
`;

const Body = styled.View`
  align-items: center;
  justify-content: flex-start;
  margin-top: 44px;
`;

const Footer = styled.View`
  align-items: center;
  justify-content: flex-end;
  margin-top: 40px;
`;

const SkipText = styled.Text`
  margin-bottom: 26px;
  color: ${props => props.theme.colors.mediumGray};
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
`;

function CreateToddler({ navigation }) {
  return (
    <ScreenWrapper>
      <Header>
        <Description>{translations.createtoddler_header_text}</Description>
      </Header>
      <Body>
        <ImagePickerComponent/>
        <UserForm />
      </Body>
      <Footer>
        <BasicButton label={translations.createtoddler_footer_button1} onPress={() => navigation.navigate('SignUp')}/>
        <SkipText>{translations.createtoddler_footer_button2}</SkipText>
      </Footer>
    </ScreenWrapper>
  );
}

CreateToddler.propTypes = {};

CreateToddler.defaultProps = {};

export default CreateToddler;
