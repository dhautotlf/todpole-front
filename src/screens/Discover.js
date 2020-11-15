import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { getActivities } from '../hooks';

function Discover({ displayName }) {
  const { data = [], isLoading } = getActivities();

  return (
    <View>
      <Text>{displayName}</Text>
      <Text onPress={() => {}}>NEXT</Text>
      {isLoading || !data ? (
        <ActivityIndicator />
      ) : (
        data.map((d) => <Text key={d.id}>{JSON.stringify(d)}</Text>)
      )}
    </View>
  );
}

Discover.propTypes = {
  displayName: PropTypes.string,
};

Discover.defaultProps = {
  displayName: 'Discover',
};

export default Discover;
