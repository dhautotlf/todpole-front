import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Activity from '../components/Activity';

const ActivityFlatList = styled(FlatList)``;

const getMainImage = (activityImageList = []) =>
  activityImageList.find(({ isMain }) => isMain);

const ActivityList = (props) => (
  <ActivityFlatList
    {...props}
    contentContainerStyle={{ flexGrow: 1 }}
    ListHeaderComponent={props.children || props.ListHeaderComponent}
    numColumns={2}
    columnWrapperStyle={{
      justifyContent: 'space-evenly',
    }}
    renderItem={({ item: act }) => (
      <Activity
        key={`ALL${act.id}`}
        id={act.id}
        img={getMainImage(act.activityImageList)}
        title={act.name}
      />
    )}
    keyExtractor={({ id }) => `ACTIVITY-${id}`}
  />
);

ActivityList.propTypes = {
  data: PropTypes.array,
  children: PropTypes.any,
  ListHeaderComponent: PropTypes.any,
};

ActivityList.defaultProps = {};

export default ActivityList;
