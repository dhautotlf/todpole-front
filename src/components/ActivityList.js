import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Activity from '../components/Activity';

const ActivityFlatList = styled(FlatList).attrs(({ theme }) => ({
  columnWrapperStyle: {
    marginHorizontal: theme.spacing.small,
    marginBottom: theme.spacing.tiny,
  },
}))``;

const VerticalSeparator = styled(View)`
  width: ${({ theme }) => theme.spacing.small}px;
`;

const ActivityList = (props) => (
  <ActivityFlatList
    {...props}
    contentContainerStyle={{ flexGrow: 1 }}
    ListHeaderComponent={props.children || props.ListHeaderComponent}
    numColumns={2 + 1} // to include the vertical separator
    renderItem={({ item, index }) =>
      (index - 1) % 3 ? <Activity {...item} /> : <VerticalSeparator />
    }
    keyExtractor={({ id }) => `ACTIVITY-${id}`}
  />
);

ActivityList.propTypes = {
  data: PropTypes.array,
  children: PropTypes.any,
  ListHeaderComponent: PropTypes.any,
  numColumns: PropTypes.number,
};

ActivityList.defaultProps = {};

export default ActivityList;
