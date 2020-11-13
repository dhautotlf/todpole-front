import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

function Discover({ displayName }) {
  return (
    <View>
      <Text>{displayName}</Text>
      <Text onPress={() => {}}>NEXT</Text>
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
