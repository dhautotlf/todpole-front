import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

function SignIn({ displayName }) {
  return (
    <View>
      <Text>{displayName}</Text>
      <Text onPress={() => {}}>NEXT</Text>
    </View>
  );
}

SignIn.propTypes = {
  displayName: PropTypes.string,
};

SignIn.defaultProps = {
  displayName: 'SignIn',
};

export default SignIn;
