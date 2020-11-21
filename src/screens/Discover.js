import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Activity from '../components/Activity';
import MenuArea from '../components/MenuArea';
import WelcomeCategory from '../components/WelcomeCategory';
import Surprise from '../components/Surprise';
import SearchBar from '../components/SearchBar';
import { getActivities } from '../hooks';
import { translations } from '../constants/translations';
import shallowFilter from '../utils/shallowStringFilter';

import { useNavigation } from '@react-navigation/native';

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

const TrendingContainer = styled.View`
  margin-top: 21px;
`;

const IdeasContainer = styled.View`
  margin-top: 18px;
`;

const MoreSection = styled.View``;

const SectionTitle = styled(Text)`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 15px;
`;

const Activities = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const IdeasForYou = styled(FlatList)``;

function Discover() {
  const { navigate } = useNavigation();
  const { data = [], isLoading } = getActivities();
  const [filterParam, onSearchParamChange] = useState({});

  const getMainImage = (activityImageList) =>
    activityImageList.find(({ isMain }) => isMain);

  const SEARCH_TRIGGER_CHAR_COUNT = 2;
  const filterResults = (data) =>
    shallowFilter(data, filterParam.text, SEARCH_TRIGGER_CHAR_COUNT);

  const renderActivities = () => {
    const activities = filterResults(data).map((d) => (
      <Activity
        key={`ALL${d.id}`}
        id={d.id}
        img={getMainImage(d.activityImageList)}
        title={d.name}
      />
    ));
    return <Activities>{activities}</Activities>;
  };

  const getTrendingData = () =>
    filterResults(data).map((d) => {
      const img = getMainImage(d.activityImageList);
      return { id: d.id, title: d.name, url: img.url };
    });

  return (
    <StyledSafeAreaView>
      <ScreenWrapper>
        <Surprise />
        <Header>
          <MenuArea screen="discover" />
          <SearchArea></SearchArea>
        </Header>
        {isLoading || !data ? (
          <ActivityIndicator />
        ) : (
          <>
            <SearchBar
              value={filterParam.text}
              onChangeText={(text) =>
                onSearchParamChange({ ...filterParam, text })
              }
              onFilterPress={() => navigate('SearchModal', filterParam)}
            />
            <TrendingContainer>
              <SectionTitle>{translations.discover_topic_title1}</SectionTitle>
              <IdeasForYou
                horizontal
                data={getTrendingData()}
                renderItem={({ item }) => (
                  <Activity id={item.id} title={item.title} img={item} />
                )}
                keyExtractor={(item) => `TRENDING-${item.id}`}
              />
            </TrendingContainer>
            <IdeasContainer>
              <SectionTitle>{translations.discover_topic_title2}</SectionTitle>
              <IdeasForYou
                horizontal
                data={filterResults(translations.discover_categories)}
                renderItem={({ item }) => (
                  <WelcomeCategory title={item.title} image={item.image} />
                )}
                keyExtractor={({ title }) => `IDEAS-${title}`}
              />
            </IdeasContainer>
            <MoreSection>
              <SectionTitle>{translations.discover_topic_title3}</SectionTitle>
              {renderActivities()}
            </MoreSection>
          </>
        )}
      </ScreenWrapper>
    </StyledSafeAreaView>
  );
}

Discover.propTypes = {};

export default Discover;
