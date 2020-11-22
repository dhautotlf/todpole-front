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

const Placeholder = styled(View)`
  flex: 1;
`;

const verticalSeparatorStyle = (index) => ({
  paddingLeft: index % 2 && 7,
  paddingRight: index % 2 === 0 && 7,
});

// placeholder is necessary to prevent the last odd item of the list to take up the full width
const withPlaceholder = (data) => {
  if (!data) return data;
  if (data.length % 2) return [...data, { placeholder: true }];
  return data;
};

const ActivityList = (props) => (
  <ActivityFlatList
    {...props}
    initialNumToRender={4}
    data={withPlaceholder(props.data)}
    contentContainerStyle={{ flexGrow: 1 }}
    ListHeaderComponent={props.children || props.ListHeaderComponent}
    numColumns={2}
    renderItem={({ item, index }) => {
      if (item.placeholder) return <Placeholder />;
      return <Activity style={verticalSeparatorStyle(index)} {...item} />;
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
