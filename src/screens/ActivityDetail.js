import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

function CreateActivity({ displayName }) {
  return (
    <View>
      <Text>{displayName}</Text>
      <Text onPress={() => {}}>NEXT</Text>
    </View>
  );
}

CreateActivity.propTypes = {
  displayName: PropTypes.string,
};

CreateActivity.defaultProps = {
  displayName: 'CreateActivity',
};

export default CreateActivity;
