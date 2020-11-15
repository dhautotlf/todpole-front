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

function Discover({ displayName }) {
  const { data = [], isLoading } = getActivities();

  const renderActivities = () => {
    const activities = data.map((d) => {
      const img = d.activityImageList.filter((image) => image.isMain)[0];
      return <Activity key={d.id} img={img} title={d.name} />;
    });
    return <Activities>{activities}</Activities>;
  };

  return (
    <StyledSafeAreaView>
      <ScreenWrapper>
        <View>
          <SectionTitle>{translations.discover_topic_title2}</SectionTitle>
          <IdeasForYou
            horizontal
            data={translations.discover_categories}
            renderItem={({ item }) => <WelcomeCategory title={item.title} />}
            keyExtractor={(item) => item.title}
          />
        </View>
        <View>
          <SectionTitle>{translations.discover_topic_title3}</SectionTitle>
          {isLoading || !data ? <ActivityIndicator /> : renderActivities()}
        </View>
      </ScreenWrapper>
    </StyledSafeAreaView>
  );
}

Discover.propTypes = {
  displayName: PropTypes.string,
};

Discover.defaultProps = {
  displayName: 'Discover',
};

export default Discover;
