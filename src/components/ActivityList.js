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

const Placeholder = styled(View)`
  flex: 1;
`;

// placeholder is necessary to prevent the last odd item of the list to take up the full width
const withPlaceholder = (data) => {
  if (!data) return data;
  if (data.length % 2) return [...data, { placeholder: true }];
  return data;
};

const ActivityList = (props) => (
  <ActivityFlatList
    {...props}
    data={withPlaceholder(props.data)}
    contentContainerStyle={{ flexGrow: 1 }}
    ListHeaderComponent={props.children || props.ListHeaderComponent}
    numColumns={2 + 1} // to include the vertical separator
    renderItem={({ item, index }) => {
      if (item.placeholder) return <Placeholder />;
      if ((index - 1) % 3 === 0) return <VerticalSeparator />;
      return <Activity {...item} />;
    }}
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
