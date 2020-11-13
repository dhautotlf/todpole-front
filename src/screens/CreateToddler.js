import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import BasicButton from '../components/BasicButton';
import UserForm from '../components/UserForm';
import ImagePickerComponent from '../components/ImagePickerComponent';
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
  margin: 25px 36px 0px 36px;
`;

const Body = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 44px;
`;


const Footer = styled.View`
  align-items: center;
`;

const SkipText = styled.Text`
  margin-bottom: 26px;
  color: ${props => props.theme.colors.mediumGray};
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
`;

function CreateToddler({ displayName, navigation }) {
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

CreateToddler.propTypes = {
  displayName: PropTypes.string,
};

CreateToddler.defaultProps = {
  displayName: 'CreateToddler',
};

export default CreateToddler;
