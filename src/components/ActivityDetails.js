import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import TimerIcon from '../assets/icons/timer.svg';
import StarIcon from '../assets/icons/star.svg';
import CategoryIcon from '../assets/icons/category.svg';
import ActivityMaterial from '../components/ActivityMaterial';
import ActivityDescription from '../components/ActivityDescription';
import ActivityReview from '../components/ActivityReview';
import { translations } from '../constants/translations';

const ActivityDetailsWrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 316px;
`;

const ActivityDetailsTabs = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ActivityMaterialWrapper = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 12px 0px;
`;

const ActivityDescriptionWrapper = styled(ActivityMaterialWrapper)``;

const ActivityReviewWrapper = styled(ActivityMaterialWrapper)``;

const ActivityButton = styled.TouchableOpacity`
  height: 22px;
  border-bottom-width: ${(props) => (props.selected ? 2 : 0)}px;
  border-bottom-color: ${(props) =>
    props.selected ? props.theme.colors.yellow : props.theme.colors.white};
`;

const Label = styled.Text`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
`;

const ActivityDetailsContent = styled.View`
  flex: 1;
  margin-top: 25px;
`;

function ActivityDetails({ activityData }) {
  const [selectedTab, setSelectedTab] = useState('material');
  const renderActivityContent = () => {
    let tabContent = null;

    switch (selectedTab) {
      case 'description':
        tabContent = (
          <ActivityDescription description={activityData.description} />
        );
        break;
      case 'review':
        tabContent = <ActivityReview />;
        break;
      default:
        tabContent = <ActivityMaterial />;
    }

    return tabContent;
  };

  const changeTab = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <ActivityDetailsWrapper>
      <ActivityDetailsTabs>
        <ActivityButton
          selected={selectedTab === 'material'}
          onPress={() => changeTab('material')}
        >
          <Label>{translations.activitydetail_topic_title1}</Label>
        </ActivityButton>
        <ActivityButton
          selected={selectedTab === 'description'}
          onPress={() => changeTab('description')}
        >
          <Label>{translations.activitydetail_topic_title2}</Label>
        </ActivityButton>
        <ActivityButton
          selected={selectedTab === 'review'}
          onPress={() => changeTab('review')}
        >
          <Label>{translations.activitydetail_topic_title3}</Label>
        </ActivityButton>
      </ActivityDetailsTabs>
      <ActivityDetailsContent>{renderActivityContent()}</ActivityDetailsContent>
    </ActivityDetailsWrapper>
  );
}

ActivityDetails.propTypes = {
  activityData: PropTypes.object,
};

ActivityDetails.defaultProps = {
  activityData: {},
};

export default ActivityDetails;
