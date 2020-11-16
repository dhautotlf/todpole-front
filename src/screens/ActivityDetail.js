import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { getActivities } from '../hooks';
import { translations } from '../constants/translations';
import ActivitySummary from '../components/ActivitySummary';

const ScreenWrapper = styled.ScrollView.attrs((props) => ({
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))`
  background: ${(props) => props.theme.colors.white};
  flex: 1;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
  position: relative;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing.tiny}px;
`;

const AgeDetails = styled.View`
  width: 136px;
  height: 37px;
  position: absolute;
  z-index: 2;
  left: 0px;
  top: 22px;
  background: ${(props) => props.theme.colors.yellow};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 10px;
`;

const AgeText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => props.theme.colors.white};
`;

const ActivityImage = styled.Image`
  width: 316px;
  height: 316px;
  border-radius: 8px;
`;

const Body = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`;

function ActivityDetail({ route }) {
  const { id, url } = route.params;
  const { data = [], isLoading } = getActivities();
  const activityData = data[id];
  console.log('activityData', activityData);

  return (
    <ScreenWrapper>
      <Header>
        <AgeDetails>
          <AgeText>{`${activityData.ageMin} - ${activityData.ageMax} ${translations.activitydetail_topic_age}`}</AgeText>
        </AgeDetails>
        <ActivityImage
          source={{
            uri: url,
          }}
        ></ActivityImage>
      </Header>
      <Body>
        <ActivitySummary
          name={activityData.name}
          category={activityData.category}
        />
      </Body>
    </ScreenWrapper>
  );
}

ActivityDetail.propTypes = {};

ActivityDetail.defaultProps = {};

export default ActivityDetail;
