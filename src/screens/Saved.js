import React, { useState, useMemo, useEffect } from 'react';
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
import { getBookmarkedActivities, getUser, getUserActivities } from '../hooks';
import activityFilters, {
  toString,
  isFilterActive,
} from '../utils/activityFilters';
import { get, isObject, isEmpty, isNil } from 'lodash';

const smallSpacing = ({ theme }) => theme.spacing.small;

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

const EmptyCreations = () => (
  <BodyBottom>
    <BoldText>{translations.saved_emptystate_text2}</BoldText>
    <ArrowIcon />
  </BodyBottom>
);

const DISCOVER = 1;
const SAVED = 2;
const TABS = [
  { id: DISCOVER, title: translations.saved_tab_title1 },
  { id: SAVED, title: translations.saved_tab_title2 },
];

function Saved({ route }) {
  const { navigate } = useNavigation();
  const [filters, onFiltersChanged] = useState(
    get(route, 'params.filters', {}),
  );
  const [selectedTab, onTabSelected] = useState(DISCOVER);
  const { data: user } = getUser();

  useEffect(() => {
    onFiltersChanged(get(route, 'params.filters', {}));
  }, [route]);

  const { data, isLoading } = {
    [DISCOVER]: getBookmarkedActivities,
    [SAVED]: () => getUserActivities(user),
  }[selectedTab]();

  const filterResults = useMemo(() => activityFilters(data, filters), [
    data,
    filters,
  ]);

  return (
    <StyledSafeAreaView>
      <ScreenWrapper>
        <ActivityList
          data={filterResults}
          ListEmptyComponent={() => {
            if (isLoading) return <Loading />;
            if (selectedTab === DISCOVER) return <EmptyFavorite />;
            if (selectedTab === SAVED) return <EmptyCreations />;
          }}
        >
          <>
            <Header>
              <MenuArea screen="saved" />
              <TabContainer>
                {TABS.map(({ id, title }) => (
                  <TabItem
                    key={id}
                    label={title}
                    onPress={() => onTabSelected(id)}
                    selected={selectedTab === id}
                  />
                ))}
              </TabContainer>
              <SearchArea>
                <SearchBar
                  value={toString(filters)}
                  isFilterActive={isFilterActive(filters)}
                  onChangeText={(text) =>
                    onFiltersChanged({ ...filters, text })
                  }
                  onClearPress={() => onFiltersChanged({})}
                  onFilterPress={() =>
                    navigate('FilterModal', {
                      backRoute: 'Saved',
                      filters,
                    })
                  }
                  onSettingsPress={() => navigate('User')}
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
  route: PropTypes.any,
};

Saved.defaultProps = {};

export default Saved;
