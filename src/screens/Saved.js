import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

function Saved({ displayName }) {
  return (
    <View>
      <Text>{displayName}</Text>
      <Text onPress={() => {}}>NEXT</Text>
    </View>
  );
}

Saved.propTypes = {
  displayName: PropTypes.string,
};

Saved.defaultProps = {
  displayName: 'Saved',
};

export default Saved;
