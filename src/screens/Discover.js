import React from 'react';
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
import { getActivities } from '../hooks';
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
  const { data = [], isLoading } = getActivities();

  const renderActivities = () => {
    const activities = data.map((d) => {
      const img = d.activityImageList.filter((image) => image.isMain)[0];
      return <Activity key={d.id} id={d.id} img={img} title={d.name} />;
    });
    return <Activities>{activities}</Activities>;
  };

  const getTrendingData = () => {
    return data.map((d) => {
      const img = d.activityImageList.filter((image) => image.isMain)[0];
      return {title: d.name, url: img.url};
    });
  }

  return (
    <StyledSafeAreaView>
      <ScreenWrapper>
        <Header>
          <MenuArea screen="discover"/>
          <SearchArea>
          </SearchArea>
        </Header>
        {isLoading || !data ? <ActivityIndicator /> :
          (<>
            <TrendingContainer>
              <SectionTitle>{translations.discover_topic_title1}</SectionTitle>
              <IdeasForYou
                horizontal
                data={getTrendingData()}
                renderItem={({ item }) => <Activity title={item.title} img={item}/>}
                keyExtractor={(item) => item.title}
              />
            </TrendingContainer>
            <IdeasContainer>
              <SectionTitle>{translations.discover_topic_title2}</SectionTitle>
              <IdeasForYou
                horizontal
                data={translations.discover_categories}
                renderItem={({ item }) => <WelcomeCategory title={item.title} />}
                keyExtractor={(item) => item.title}
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
