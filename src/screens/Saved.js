import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import MenuArea from '../components/MenuArea';
import BasicButton from '../components/BasicButton';
import SearchBar from '../components/SearchBar';
import TabItem from '../components/TabItem';
import ActivityList from '../components/ActivityList';
import Loading from '../components/Loading';
import { translations } from '../constants/translations';
import BoxIcon from '../assets/icons/box.svg';
import ArrowIcon from '../assets/icons/scribble-arrow.svg';
import { getBookmarkedActivities } from '../hooks';
import shallowFilter from '../utils/shallowStringFilter';

const smallSpacing = ({ theme }) => theme.spacing.small;
const tinySpacing = ({ theme }) => theme.spacing.tiny;

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;

const ScreenWrapper = styled.View`
  background: ${(props) => props.theme.colors.white};
  flex: 1;
`;

const Header = styled.View`
  padding-bottom: ${smallSpacing}px;
`;

const SearchArea = styled.View`
  margin-horizontal: ${smallSpacing}px;
`;

const Body = styled.View`
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const BodyBottom = styled.View`
  flex-direction: column;
  flex: 1;
  padding-bottom: 30px;
  align-items: center;
  justify-content: flex-end;
`;

const TabContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: ${smallSpacing}px;
`;

const BoldText = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${(props) => props.theme.colors.black};
  font-weight: bold;
  margin-vertical: 15px;
`;

const EmptyFavorite = () => {
  const { navigate } = useNavigation();
  return (
    <Body>
      <BoxIcon />
      <BoldText>{translations.saved_emptystate_text1}</BoldText>
      <BasicButton
        selected
        label={'Discover'}
        onPress={() => navigate('Discover')}
      />
    </Body>
  );
};

const SEARCH_TRIGGER_CHAR_COUNT = 2;
const EmptyCreations = () => (
  <BodyBottom>
    <BoldText>{translations.saved_emptystate_text2}</BoldText>
    <ArrowIcon />
  </BodyBottom>
);

function Saved({ tabs }) {
  const { navigate } = useNavigation();
  const [filterParam, onSearchParamChange] = useState({});
  const [selectedTabIndex, onTabSelected] = useState(0);
  const { data = [], isLoading } = getBookmarkedActivities();

  const filterResults = (data) =>
    shallowFilter(data, filterParam.text, SEARCH_TRIGGER_CHAR_COUNT);

  return (
    <StyledSafeAreaView>
      <ScreenWrapper>
        <ActivityList
          data={filterResults(data)}
          ListEmptyComponent={() => {
            if (isLoading) return <Loading />;
            if (selectedTabIndex === 0) return <EmptyFavorite />;
            if (selectedTabIndex === 1) return <EmptyCreations />;
          }}
        >
          <>
            <Header>
              <MenuArea screen="saved" />
              <TabContainer>
                {tabs.map((label, index) => (
                  <TabItem
                    key={label}
                    label={label}
                    onPress={() => onTabSelected(index)}
                    selected={selectedTabIndex === index}
                  />
                ))}
              </TabContainer>
              <SearchArea>
                <SearchBar
                  value={filterParam.text}
                  onChangeText={(text) =>
                    onSearchParamChange({ ...filterParam, text })
                  }
                  onFilterPress={() => navigate('SearchModal', filterParam)}
                />
              </SearchArea>
            </Header>
          </>
        </ActivityList>
      </ScreenWrapper>
    </StyledSafeAreaView>
  );
}

Saved.propTypes = {
  tabs: PropTypes.array,
};

Saved.defaultProps = {
  tabs: [translations.saved_tab_title1, translations.saved_tab_title2],
};

export default Saved;
