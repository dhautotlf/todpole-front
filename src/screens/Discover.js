import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';
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

import { useNavigation } from '@react-navigation/native';

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;

const ScreenWrapper = styled.View`
  background: ${(props) => props.theme.colors.white};
  flex: 1;
`;

const Header = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const SearchArea = styled.View`
  margin-horizontal: 14px;
`;

const TrendingContainer = styled.View`
  margin-top: 21px;
`;

const IdeasContainer = styled.View`
  margin-top: 18px;
`;

const HorizontalFlatlistHeader = styled.View`
  width: 14px;
`;

const VerticalSeparator = styled.View`
  width: 10px;
`;

const SectionTitle = styled(Text)`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 15px;
  margin-horizontal: 14px;
`;

const IdeasForYou = styled(FlatList).attrs(() => ({
  ListHeaderComponent: HorizontalFlatlistHeader,
}))``;

function Discover() {
  const { navigate } = useNavigation();
  const { data = [], isLoading } = getActivities();
  const [filterParam, onSearchParamChange] = useState({});

  const getMainImage = (activityImageList) =>
    activityImageList.find(({ isMain }) => isMain);

  const SEARCH_TRIGGER_CHAR_COUNT = 2;

  const filterResults = (data) =>
    shallowFilter(data, filterParam.text, SEARCH_TRIGGER_CHAR_COUNT);

  const getTrendingData = () =>
    filterResults(data).map((d) => {
      const img = getMainImage(d.activityImageList) || {};
      return { id: d.id, title: d.name, url: img.url };
    });

  const isSearchMode =
    filterParam.text && filterParam.text.length >= SEARCH_TRIGGER_CHAR_COUNT;

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
                  <IdeasForYou
                    horizontal
                    data={getTrendingData()}
                    renderItem={({ item }) => (
                      <Activity id={item.id} title={item.title} img={item} />
                    )}
                    ItemSeparatorComponent={() => <VerticalSeparator />}
                    keyExtractor={(item) => `TRENDING-${item.id}`}
                  />
                </TrendingContainer>
                <IdeasContainer>
                  <SectionTitle>
                    {translations.discover_topic_title2}
                  </SectionTitle>
                  <IdeasForYou
                    horizontal
                    data={filterResults(translations.discover_categories)}
                    renderItem={({ item }) => (
                      <WelcomeCategory title={item.title} image={item.image} />
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
