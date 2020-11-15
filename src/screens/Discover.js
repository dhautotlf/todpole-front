import React from 'react';
import { Text, View, ActivityIndicator, Image } from 'react-native';
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
        data.map((d) => (
          <View key={d.id}>
            {d.activityImageList.map(({ url }) => (
              <Image
                key={url}
                style={{ height: 50, width: 50, backgroundColor: 'pink' }}
                source={{ uri: url }}
              />
            ))}
            <Text>{JSON.stringify(d)}</Text>
          </View>
        ))
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
