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
import _, { get, isEmpty, omitBy, isNil } from 'lodash';

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
  min-height: 200px;
`;

const IdeasForYou = styled.FlatList.attrs(() => ({
  horizontal: true,
  ListHeaderComponent: HorizontalFlatlistHeader,
}))``;

function Discover({ route }) {
  const { navigate } = useNavigation();
  const { data = [], isLoading } = getActivities();
  const [filters, onFiltersChanged] = useState(
    get(route, 'params.filters', {}),
  );

  React.useEffect(() => {
    onFiltersChanged(get(route, 'params.filters', {}));
  }, [route]);

  const SEARCH_TRIGGER_CHAR_COUNT = 2;

  const filterResults = (data) =>
    shallowFilter(data, filters.text, SEARCH_TRIGGER_CHAR_COUNT);

  const getTrendingData = () => filterResults(data);

  console.log('Discover', { filters });
  const isSearchMode =
    get(filters, 'text.length', 0) >= SEARCH_TRIGGER_CHAR_COUNT;

  const filterStringBuilder = (props) => {
    return props.text;
    // console.log('filterStringBuilder', props);
    // console.log('filterStringBuilder', filters);
    console.log('filterStringBuilder', props);
    return Object.entries(props).reduce((acc, [k, v]) => {
      // console.log('Object.entries', k, v);
      const formatter = {
        text: (value) => value,
        category: (value) => value.name,
        ageMax: (value) => `${value} months`,
        ageMin: (value) => `${value} months`,
        timing: (value) => `${value} minutes`,
        review: ({ ratings }) => (isEmpty(ratings) ? null : `${ratings} stars`),
      }[k];
      console.log({ acc, k, v }, formatter, formatter(v));
      return formatter && formatter(v) ? `${acc} ${formatter(v)}` : acc;
    }, '');
  };

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
                  value={filterStringBuilder(filters)}
                  onChangeText={(text) =>
                    onFiltersChanged({ ...filters, text })
                  }
                  onFilterPress={() =>
                    navigate('FilterModal', {
                      backRoute: 'Discover',
                      filters,
                    })
                  }
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
