import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import MenuArea from '../components/MenuArea';
import { translations } from '../constants/translations';

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;

const ScreenWrapper = styled.ScrollView.attrs((props) => ({
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 17,
    paddingRight: 17,
  },
}))`
  background: ${(props) => props.theme.colors.white};
  flex: 1;
`;

const Header = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const SearchArea = styled.View``;

function Saved() {
  return (
    <StyledSafeAreaView>
      <ScreenWrapper>
        <Header>
          <MenuArea screen="saved"/>
          <SearchArea>
          </SearchArea>
        </Header>
      </ScreenWrapper>
    </StyledSafeAreaView>
  );
}

Saved.propTypes = {};

Saved.defaultProps = {};

export default Saved;
