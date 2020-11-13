import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

function CreateToddler({ displayName }) {
  return (
    <View>
      <Text>{displayName}</Text>
      <Text onPress={() => {}}>NEXT</Text>
    </View>
  );
}

CreateToddler.propTypes = {
  displayName: PropTypes.string,
};

CreateToddler.defaultProps = {
  displayName: 'CreateToddler',
};

export default CreateToddler;
