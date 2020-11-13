import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

function SignUp({ displayName, navigation }) {
  return (
    <View>
      <Text>{displayName}</Text>
      <Text onPress={() => navigation.navigate('SignIn')}>Go to SignIn</Text>
      <Text
        onPress={() => navigation.navigate('HomeTab', { screen: 'Settings' })}
      >
        Go to Discover
      </Text>
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
