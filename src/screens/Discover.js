import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Activity from '../components/Activity';
import MenuArea from '../components/MenuArea';
import WelcomeCategory from '../components/WelcomeCategory';
import Surprise from '../components/Surprise';
import SearchBar from '../components/SearchBar';
import ActivityList from '../components/ActivityList';
import Loading from '../components/Loading';
import { getActivities } from '../hooks';
import { translations } from '../constants/translations';
import shallowFilter from '../utils/shallowStringFilter';
import { get } from 'lodash';

const smallSpacing = ({ theme }) => theme.spacing.small;
const tinySpacing = ({ theme }) => theme.spacing.tiny;

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const ScreenWrapper = styled.View`
  background: ${(props) => props.theme.colors.white};
  flex: 1;
`;

const Header = styled.View`
  padding-bottom: ${tinySpacing}px;
`;

const SearchArea = styled.View`
  margin-horizontal: ${smallSpacing}px;
`;

const TrendingContainer = styled.View`
  margin-top: ${smallSpacing}px;
`;

const IdeasContainer = styled(TrendingContainer)`
  margin-top: ${smallSpacing}px;
`;

const HorizontalFlatlistHeader = styled.View`
  width: ${smallSpacing}px;
`;

const VerticalSeparator = styled.View`
  width: ${tinySpacing}px;
`;

const ActivityWrapper = styled.View`
  width: 160px;
`;

const SectionTitle = styled.Text`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: ${smallSpacing}px;
  margin-horizontal: ${smallSpacing}px;
`;

const Trending = styled.FlatList.attrs(() => ({
  horizontal: true,
  ItemSeparatorComponent: VerticalSeparator,
  ListHeaderComponent: HorizontalFlatlistHeader,
}))`
  padding-bottom: ${tinySpacing}px;
`;

const IdeasForYou = styled.FlatList.attrs(() => ({
  horizontal: true,
  ListHeaderComponent: HorizontalFlatlistHeader,
}))``;

function Discover() {
  const { navigate } = useNavigation();
  const { data = [], isLoading } = getActivities();
  const [filterParam, onSearchParamChange] = useState({});

  const SEARCH_TRIGGER_CHAR_COUNT = 2;

  const filterResults = (data) =>
    shallowFilter(data, filterParam.text, SEARCH_TRIGGER_CHAR_COUNT);

  const getTrendingData = () => filterResults(data);

  const isSearchMode =
    get(filterParam, 'text.length', 0) >= SEARCH_TRIGGER_CHAR_COUNT;

  return (
    <StyledSafeAreaView>
      <Surprise />
      <ScreenWrapper>
        <ActivityList data={filterResults(data)}>
          <>
            <Header>
              <MenuArea screen="discover" />
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
            {isLoading || (!data && <Loading />)}
            {!isSearchMode && !isLoading && data && (
              <>
                <TrendingContainer>
                  <SectionTitle>
                    {translations.discover_topic_title1}
                  </SectionTitle>
                  <Trending
                    data={getTrendingData()}
                    renderItem={({ item }) => (
                      <ActivityWrapper>
                        <Activity {...item} />
                      </ActivityWrapper>
                    )}
                    keyExtractor={({ id }) => `TRENDING-${id}`}
                  />
                </TrendingContainer>
                <IdeasContainer>
                  <SectionTitle>
                    {translations.discover_topic_title2}
                  </SectionTitle>
                  <IdeasForYou
                    data={filterResults(translations.discover_categories)}
                    renderItem={({ item }) => <WelcomeCategory {...item} />}
                    keyExtractor={({ title }) => `IDEAS-${title}`}
                  />
                </IdeasContainer>
                <SectionTitle>
                  {translations.discover_topic_title3}
                </SectionTitle>
              </>
            )}
          </>
        </ActivityList>
      </ScreenWrapper>
    </StyledSafeAreaView>
  );
}

Discover.propTypes = {};

export default Discover;
