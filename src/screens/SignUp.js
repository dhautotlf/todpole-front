import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

function SignUp({ displayName }) {
  return (
    <View>
      <Text>{displayName}</Text>
      <Text onPress={() => {}}>NEXT</Text>
    </View>
  );
}

SignUp.propTypes = {
  displayName: PropTypes.string,
};

SignUp.defaultProps = {
  displayName: 'SignUp',
};

export default SignUp;
