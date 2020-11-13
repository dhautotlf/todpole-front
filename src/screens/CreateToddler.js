import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

function CreateToddler({ displayName, navigation }) {
  return (
    <View>
      <Text>{displayName}</Text>
      <Text onPress={() => navigation.navigate('SignUp')}>Go to SignUp</Text>
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
