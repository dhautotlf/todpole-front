import React from 'react';
import { Text, SafeAreaView, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import BasicButton from '../components/BasicButton';
import UserForm from '../components/UserForm';
import ImagePickerComponent from '../components/ImagePickerComponent';
import { translations } from '../constants/translations';

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const ScreenWrapper = styled.ScrollView.attrs((props) => ({
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))`
  background: ${(props) => props.theme.colors.white};
  flex: 1;
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

const ImagePickerComponentWrapper = styled.View`
  margin-bottom: 28px;
`;

const Footer = styled.View`
  align-items: center;
  justify-content: flex-end;
  margin-top: 40px;
`;

const SkipText = styled.Text`
  margin-bottom: 26px;
  color: ${(props) => props.theme.colors.mediumGray};
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
`;

function CreateToddler({ navigation }) {
  return (
    <StyledSafeAreaView>
      <ScreenWrapper>
        <Header>
          <Description>{translations.createtoddler_header_text}</Description>
        </Header>
        <Body>
          <ImagePickerComponentWrapper>
            <ImagePickerComponent />
          </ImagePickerComponentWrapper>
          <UserForm />
        </Body>
        <Footer>
          <BasicButton
            label={translations.createtoddler_footer_button1}
            onPress={() => navigation.navigate('SignUp')}
          />
          <SkipText onPress={() => navigation.navigate('SignUp')}>
            {translations.createtoddler_footer_button2}
          </SkipText>
        </Footer>
      </ScreenWrapper>
    </StyledSafeAreaView>
  );
}

CreateToddler.propTypes = {};

CreateToddler.defaultProps = {};

export default CreateToddler;
