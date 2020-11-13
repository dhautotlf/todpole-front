import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

function Welcome({ displayName }) {
  return (
    <View>
      <Text>{displayName}</Text>
      <Text onPress={() => {}}>NEXT</Text>
    </View>
  );
}

Welcome.propTypes = {
  displayName: PropTypes.string,
};

Welcome.defaultProps = {
  displayName: 'Welcome',
};

export default Welcome;
