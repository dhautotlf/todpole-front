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
import _, { get, isEmpty, isNil, has, isObject } from 'lodash';

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

  const filterResults = (data) => {
    let results = data;
    if (filters.text)
      results = shallowFilter(results, filters.text, SEARCH_TRIGGER_CHAR_COUNT);
    if (filters.materials && has(results, '[0].materialList')) {
      const containsAllTheMaterial = ({ materialList }) =>
          Object.values(filters.materials).every(({ id }) =>
            materialList.map(({ id }) => id).includes(id),
          ),
        results = results.filter(containsAllTheMaterial);
    }
    if (filters.category) {
      const isCategory = ({ category }) => category <= filters.category.value;
      results = results.filter(isCategory);
    }
    if (filters.timing) {
      const lesserThanTiming = ({ timing }) => timing <= filters.timing;
      results = results.filter(lesserThanTiming);
    }
    if (filters.ages) {
      const isBetweenTheAges = ({ ageMin, ageMax }) =>
        ageMin >= filters.ages[0] && ageMax <= filters.ages[1];
      results = results.filter(isBetweenTheAges);
    }

    return results;
  };

  const getTrendingData = () => filterResults(data);

  const isSearchMode = !Object.values(filters).every(
    (value) =>
      (isObject(value) && isEmpty(value)) || (!isObject(value) && isNil(value)),
  );

  const filterStringBuilder = (props) => {
    return props.text;
    // return Object.entries(props).reduce((acc, [k, v]) => {
    //   const formatter = {
    //     text: (value) => value,
    //     category: (value) => value.name,
    //     ageMax: (value) => `${value} months`,
    //     ageMin: (value) => `${value} months`,
    //     timing: (value) => `${value} minutes`,
    //     review: ({ ratings }) => (isEmpty(ratings) ? null : `${ratings} stars`),
    //   }[k];
    //   return formatter && formatter(v) ? `${acc} ${formatter(v)}` : acc;
    // }, '');
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
                    renderItem={({ item }) => (
                      <WelcomeCategory
                        {...item}
                        onPress={() =>
                          onFiltersChanged({
                            ...filters,
                            text: item.title,
                          })
                        }
                      />
                    )}
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
